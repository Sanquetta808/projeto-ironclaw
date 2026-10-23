// Executa um arquivo .sql no banco configurado no .env (não precisa do psql).
const fs = require('fs');
const path = require('path');
const pool = require('../db');

async function rodarSql(arquivo) {
  const sql = fs.readFileSync(path.join(__dirname, '..', arquivo), 'utf8');
  await pool.query(sql);
}

module.exports = { rodarSql, pool };
