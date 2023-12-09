// //conexão com o sqlite
// const sqliteConnection = require("../../sqlite");

// //importando a criação de usuário das migrations
// const createUsers = require("./CreateUsers");

// //Inicializar as funções das migrations
// async function migrationsRun() {
//   //Os schemas são as tabelas que o DB irá possuir
//   const schemas = [createUsers].join("");

//   //.then está executando os schemas e o catch está capturando os errors
//   sqliteConnection()
//     .then((db) => db.exec(schemas))
//     .catch((error) => console.error(error));
// }

// module.exports = migrationsRun;