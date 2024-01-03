/*

//Criação da Tabela de usuários em SQL para o DB;
//Apenas para caso de estudo, atualmente usando o knex para gerar o DB;
//IF NOT EXISTS: caso o DB ainda não exista, ele irá criar um novo para evitar conflitos caso já tenha uma tabela no DB;

const createUsers = `
CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR,
  	email VARCHAR,
  	password VARCHAR,
  	avatar VARCHAR NULL,
  	create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	admin BOOLEAN
)`;

module.exports = createUsers;
*/
