// Cria as tabelas (se ainda não existirem). Uso: npm run db:init
const { rodarSql, pool } = require('./rodar-sql');

(async () => {
  try {
    await rodarSql('schema.sql');
    console.log('Tabelas criadas/verificadas com sucesso.');
  } catch (err) {
    console.error('Erro ao criar as tabelas:', err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
})();
