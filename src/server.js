//importando o express-async-errors
require("express-async-errors");

//importando conexão com o Sqlite
// const database = require("./database/sqlite") -- substituido pelas migrations

//importando as migrations
const migrationsRun = require("./database/sqlite/migrations");

//importando AppError
const AppError = require("./utils/AppError");

//coletando o express e atribuindo a uma const
const express = require("express");

//importando as rotas
const routes = require("./routes");

//inicializando o express
const app = express();

//Informando o formato que está sendo recebido (Podemos escolher outros formatos se necessário)
app.use(express.json());

app.use(routes);

//inicializando o database
// database(); -- substituido pelas migrations
migrationsRun();

//Verificação geral de errors
//manter sintaxe mesmo se request e next não forem utilizados por exemplo
app.use((error, request, response, next) => {
  //verificação de error por parte do cliente
  if (error instanceof AppError) {
    //retornando mensagem de error
    return response.status(error.statusCode).json({
      status: "Error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "Error",
    message: "Internal server Error",
  });
});

//Porta onde será inicializado
const PORT = 3333;

//Adicionado um Listen para observar a PORT
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
