const crudRouter = require('./crudFactory');

module.exports = crudRouter('armamento', ['modelo', 'categoria', 'quantidade', 'local', 'status']);
