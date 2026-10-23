require('dotenv').config();
const { Pool, types } = require('pg');

// Devolve colunas DATE como texto 'AAAA-MM-DD' (sem fuso horário).
// Evita datas deslocadas e mantém compatível com o front.
types.setTypeParser(1082, (valor) => valor);

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  connectionTimeoutMillis: 5000 // evita que a API fique pendurada se o banco não responder
});

// Sem este listener, uma queda do PostgreSQL derrubaria a API inteira.
pool.on('error', (err) => {
  console.error('Conexão ociosa com o banco foi encerrada:', err.message);
});

module.exports = pool;
