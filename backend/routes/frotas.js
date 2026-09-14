const crudRouter = require('./crudFactory');

module.exports = crudRouter('frotas', ['prefixo', 'tipo', 'secao', 'km', 'revisao', 'status']);
