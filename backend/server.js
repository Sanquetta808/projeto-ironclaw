require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/frotas', require('./routes/frotas'));
app.use('/api/militares', require('./routes/militares'));
app.use('/api/medicamentos', require('./routes/medicamentos'));
app.use('/api/aprovisionamento', require('./routes/aprovisionamento'));
app.use('/api/armamento', require('./routes/armamento'));

app.get('/', (req, res) => {
  res.json({ status: 'IronClaw API no ar' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`IronClaw API rodando na porta ${PORT}`));
