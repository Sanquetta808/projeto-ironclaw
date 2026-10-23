require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const pool = require('./db');
const swaggerSpec = require('./swagger');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'IronClaw API no ar', documentacao: '/api-docs', saude: '/health' });
});

// Verifica se a API está de pé e se o banco responde.
app.get('/health', async (req, res) => {
  const resposta = {
    api: 'IronClaw API',
    uptime_segundos: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  };
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', banco: 'conectado', ...resposta });
  } catch (err) {
    res.status(503).json({ status: 'erro', banco: 'desconectado', ...resposta });
  }
});

// Documentação interativa (Swagger)
app.get('/api-docs.json', (req, res) => res.json(swaggerSpec));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customSiteTitle: 'IronClaw API' }));

app.use('/api/frotas', require('./routes/frotas'));
app.use('/api/militares', require('./routes/militares'));
app.use('/api/medicamentos', require('./routes/medicamentos'));
app.use('/api/aprovisionamento', require('./routes/aprovisionamento'));
app.use('/api/armamento', require('./routes/armamento'));

// Rota de API inexistente
app.use('/api', (req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Erros gerais (ex.: JSON malformado no corpo da requisição)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido no corpo da requisição' });
  }
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;

// Só abre a porta quando executado direto (permite importar o app em testes)
if (require.main === module) {
  app.listen(PORT, () => console.log(`IronClaw API rodando na porta ${PORT}`));
}

module.exports = app;
