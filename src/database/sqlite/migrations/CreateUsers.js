//Criação da Tabela de usuários em SQL para ser repassada ao Beekeeper

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