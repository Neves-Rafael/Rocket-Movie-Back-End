//importando a configuração do knex para dentro da src
const config = require("../../../knexfile");
const knex = require("knex");

//passando as configurações de conexão
const connection = knex(config.development);

//Exportamos agora a conexão para ser utilziada em toda aplicação
module.exports = connection;
