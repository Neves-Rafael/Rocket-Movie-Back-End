//expressjs é um framework web utilizado com node.js para simplificar o processo de criação de servidores web. Fornece uma amada de recursos para facilitar o roteamento e o gerenciamento de requisições/respostas. Pode criar facilmente rotas para diferentes URLs e manipular solicitações HTTP;

//importando o express-async-errors;
//trabalha junto do express para tratar erros de async
require("express-async-errors");


require("dotenv/config");

//importando conexão com o Sqlite, como passamos a usar o knex, não precisamos mais de fazer a conexão aqui. -- substituído pelas migrations;
// const database = require("./database/sqlite/migrations")
// database();

//importando as migrations de forma tradicional;
// const migrationsRun = require("./database/sqlite/migrations");

//importando o cors para permitir conexão com o frontend;
const cors = require("cors");

//importando AppError
const AppError = require("./utils/AppError");

const uploadConfig = require("./configs/upload");

//coletando o express e atribuindo a uma const;
const express = require("express");

//importando as rotas do index dentro de routes;
const routes = require("./routes");

//inicializando o express;
const app = express();

//habilitando o cors para permitir conexão com o frontend;
app.use(cors());

//Informando o formato que está sendo recebido (Podemos escolher outros formatos se necessário);
app.use(express.json());

//Adicionando as rotas para uso;
app.use(routes);

//adicionando com o express um metodo para servir arquivos estáticos com o static e pegamos o uploadConfig para passar o caminho de arquivos;
app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

//Forma tradicional de se inicializar e  usar o SQL diretamente pelo JavasScript sem o query builder
// migrationsRun();

//Verificação geral de errors, manter sintaxe mesmo se request e next não forem utilizados por exemplo;
app.use((error, request, response, next) => {
  //verificação de error por parte do cliente;
  if (error instanceof AppError) {
    //retornando mensagem de error;
    return response.status(error.statusCode).json({
      status: "Error",
      message: error.message,
    });
  }

  //retornando erro para o insomnia;
  return response.status(500).json({
    status: "Error",
    message: "Internal server Error",
  });
});

//Porta onde será inicializado;
const PORT = process.env.SERVER_PORT || 3333;

//Adicionado um Listen para observar a PORT;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
