const knex = require('knex');
const configuration = require('../../knexfile');
const connection = knex(configuration.development);
module.exports = connection;//módulo que conecta com o knex db