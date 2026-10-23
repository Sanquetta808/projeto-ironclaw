// Insere dados de exemplo. Uso: npm run seed
// Se já houver dados, não faz nada. Para apagar tudo e recarregar: npm run seed -- --limpar
const { rodarSql, pool } = require('./rodar-sql');

const TABELAS = ['frotas', 'militares', 'medicamentos', 'aprovisionamento', 'armamento'];

(async () => {
  try {
    const limpar = process.argv.includes('--limpar');
    if (limpar) {
      await pool.query(`TRUNCATE ${TABELAS.join(', ')} RESTART IDENTITY`);
      console.log('Dados anteriores apagados.');
    } else {
      let total = 0;
      for (const t of TABELAS) {
        const r = await pool.query(`SELECT COUNT(*)::int AS n FROM ${t}`);
        total += r.rows[0].n;
      }
      if (total > 0) {
        console.log(`O banco já tem ${total} registro(s). Nada foi inserido.`);
        console.log('Para apagar tudo e carregar os dados de exemplo: npm run seed -- --limpar');
        return;
      }
    }
    await rodarSql('seed.sql');
    console.log('Dados de exemplo inseridos com sucesso.');
  } catch (err) {
    console.error('Erro ao inserir os dados de exemplo:', err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
})();
