const crudRouter = require('./crudFactory');

module.exports = crudRouter('aprovisionamento', ['item', 'categoria', 'quantidade', 'unidade', 'quantidade_minima', 'secao_destino']);
