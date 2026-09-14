const express = require('express');
const pool = require('../db');

// Cria um router CRUD generico para uma tabela.
// table: nome da tabela no banco
// columns: lista das colunas editaveis (sem o id)
function crudRouter(table, columns) {
  const router = express.Router();
  const cols = columns.join(', ');
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
  const setClause = columns.map((c, i) => `${c} = $${i + 1}`).join(', ');

  // Listar todos
  router.get('/', async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${table} ORDER BY id`);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  });

  // Buscar um por id
  router.get('/:id', async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [req.params.id]);
      if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  });

  // Criar
  router.post('/', async (req, res) => {
    try {
      const values = columns.map(c => req.body[c]);
      const result = await pool.query(
        `INSERT INTO ${table} (${cols}) VALUES (${placeholders}) RETURNING *`,
        values
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  });

  // Atualizar
  router.put('/:id', async (req, res) => {
    try {
      const values = columns.map(c => req.body[c]);
      const result = await pool.query(
        `UPDATE ${table} SET ${setClause} WHERE id = $${columns.length + 1} RETURNING *`,
        [...values, req.params.id]
      );
      if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  });

  // Excluir
  router.delete('/:id', async (req, res) => {
    try {
      const result = await pool.query(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [req.params.id]);
      if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  });

  return router;
}

module.exports = crudRouter;
