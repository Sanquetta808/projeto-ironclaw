const crudRouter = require('./crudFactory');

module.exports = crudRouter('militares', ['nome', 'posto', 'secao', 'arma', 'matricula', 'status']);
