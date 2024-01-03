//expressjs é um framework web utilizado com node.js para simplificar o processo de criação de servidores web. Fornece uma amada de reursos para faciliatar o roteamente e o gerenciamento de requisições/respostas. Pode criar facilmente rotas para diferentes URLs e manipular solicitações HTTP.

//importando o express-async-errors
require("express-async-errors");

//importando conexão com o Sqlite, como passamos a usar o knex, não precisamos mais de fazer a conexão aqui
// const database = require("./database/sqlite") -- substituido pelas migrations

//importando as migrations de forma tradicional
// const migrationsRun = require("./database/sqlite/migrations");

//importando AppError
const AppError = require("./utils/AppError");

//coletando o express e atribuindo a uma const
const express = require("express")

//importando as rotas
const routes = require("./routes");

//inicializando o express
const app = express();

//Informando o formato que está sendo recebido (Podemos escolher outros formatos se necessário)
app.use(express.json());

app.use(routes);

//Forma tradicional de se inicializar e  usar o SQL diretamente pelo JavasScript sem o query builder
// migrationsRun();

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
  //retornando erro para o insominia
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
