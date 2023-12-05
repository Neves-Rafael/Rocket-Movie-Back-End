//importando o Router do express
const { Router } = require("express");

//importando o users Controller para repassar a funcionalidade
const UsersController = require("../controllers/UsersController")

//inicializando o Router
const usersRoutes = Router();

//instanciando a classe
const usersController =  new UsersController();

//Fazendo uma requisição com o get() e devolvendo com o response.send();
//Query Params
usersRoutes.post("/", usersController.create);

//exportando para quem quiser utilizar
module.exports = usersRoutes;