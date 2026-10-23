const express = require('express');
const pool = require('../db');

// Traduz erros do PostgreSQL em mensagens claras, sem expor detalhes internos.
const ERROS_PG = {
  '23502': (err) => [400, `Campo obrigatório ausente: ${err.column}`],
  '23505': () => [409, 'Registro duplicado: já existe um valor único igual cadastrado'],
  '23514': () => [400, 'Valor inválido: use uma das opções permitidas para o campo'],
  '22P02': () => [400, 'Valor em formato inválido (confira números e datas)'],
  '22007': () => [400, 'Data em formato inválido'],
  '22008': () => [400, 'Data fora do intervalo permitido'],
  '22001': () => [400, 'Texto maior que o tamanho permitido'],
  '22003': () => [400, 'Número fora do intervalo permitido']
};

function responderErro(res, err) {
  const tratar = ERROS_PG[err.code];
  if (tratar) {
    const [status, erro] = tratar(err);
    return res.status(status).json({ erro });
  }
  if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
    return res.status(503).json({ erro: 'Banco de dados indisponível' });
  }
  console.error(err);
  return res.status(500).json({ erro: 'Erro interno do servidor' });
}

// Garante que o :id da URL seja um inteiro positivo válido para o PostgreSQL.
function idValido(valor) {
  return /^\d{1,9}$/.test(valor) && Number(valor) > 0;
}

// Cria um router CRUD generico para uma tabela.
// table: nome da tabela no banco
// columns: lista das colunas editaveis (sem o id)
function crudRouter(table, columns) {
  const router = express.Router();

  const corpo = (req) =>
    req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? req.body : {};

  // Listar todos
  router.get('/', async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${table} ORDER BY id`);
      res.json(result.rows);
    } catch (err) {
      responderErro(res, err);
    }
  });

  // Buscar um por id
  router.get('/:id', async (req, res) => {
    if (!idValido(req.params.id)) return res.status(400).json({ erro: 'ID inválido' });
    try {
      const result = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [req.params.id]);
      if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
      res.json(result.rows[0]);
    } catch (err) {
      responderErro(res, err);
    }
  });

  // Criar: grava só os campos enviados (campos vazios usam o valor padrão do banco)
  router.post('/', async (req, res) => {
    const dados = corpo(req);
    const usadas = columns.filter(
      (c) => dados[c] !== undefined && dados[c] !== null && dados[c] !== ''
    );
    if (usadas.length === 0) {
      return res.status(400).json({ erro: 'Nenhum dado válido foi enviado' });
    }
    try {
      const cols = usadas.join(', ');
      const placeholders = usadas.map((_, i) => `$${i + 1}`).join(', ');
      const result = await pool.query(
        `INSERT INTO ${table} (${cols}) VALUES (${placeholders}) RETURNING *`,
        usadas.map((c) => dados[c])
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      responderErro(res, err);
    }
  });

  // Atualizar: altera só os campos enviados (campo vazio vira NULL)
  router.put('/:id', async (req, res) => {
    if (!idValido(req.params.id)) return res.status(400).json({ erro: 'ID inválido' });
    const dados = corpo(req);
    const usadas = columns.filter((c) => dados[c] !== undefined);
    if (usadas.length === 0) {
      return res.status(400).json({ erro: 'Nenhum campo para atualizar foi enviado' });
    }
    try {
      const setClause = usadas.map((c, i) => `${c} = $${i + 1}`).join(', ');
      const valores = usadas.map((c) => (dados[c] === '' ? null : dados[c]));
      const result = await pool.query(
        `UPDATE ${table} SET ${setClause} WHERE id = $${usadas.length + 1} RETURNING *`,
        [...valores, req.params.id]
      );
      if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
      res.json(result.rows[0]);
    } catch (err) {
      responderErro(res, err);
    }
  });

  // Excluir
  router.delete('/:id', async (req, res) => {
    if (!idValido(req.params.id)) return res.status(400).json({ erro: 'ID inválido' });
    try {
      const result = await pool.query(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [req.params.id]);
      if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
      res.json({ ok: true });
    } catch (err) {
      responderErro(res, err);
    }
  });

  return router;
}

module.exports = crudRouter;
