const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
//Biblioteca já inserida com o node
const path = require("path");

//Adicionando conexão com o banco de dados (necessário ser Async já que ocorre em momentos diferentes)

//Caso não exista o DB, ele irá criar um novo

async function sqliteConnection() {
  const database = await sqlite.open({
    //Utilizando o path adicionamos um caminho para a criação do nosso DB caso ele ainda não exista
    filename: path.resolve(__dirname, "..", "database.db"),
    //adicionando o driver para "rodar o sqlite"
    driver: sqlite3.Database,
  });

  return database;
}

module.exports = sqliteConnection;
