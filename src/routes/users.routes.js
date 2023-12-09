//importando o Router do express
const { Router } = require("express");

//importando o users Controller para repassar a funcionalidade
const UsersController = require("../controllers/UsersController");

//inicializando o Router
const usersRoutes = Router();

//instanciando a classe
const usersController = new UsersController();

//Fazendo uma requisição com o post chamando o usersController.create para gerar um novo usuário
//Query Params
usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);
usersRoutes.get("/:id", usersController.show);


//exportando para quem quiser utilizar
module.exports = usersRoutes;
