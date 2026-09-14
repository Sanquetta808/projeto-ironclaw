const crudRouter = require('./crudFactory');

module.exports = crudRouter('medicamentos', ['nome', 'categoria', 'quantidade', 'unidade', 'quantidade_minima', 'validade']);
