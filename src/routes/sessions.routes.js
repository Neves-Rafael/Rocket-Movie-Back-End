//criação das rotas de seção para verificar se o usuário está ou não autenticado;

const { Router} = require("express");

//importando o sessionsController e instanciando a classe;
const SessionsController = require("../controllers/SessionsController");
const sessionsControllers = new SessionsController();

//enviando a rota / para o controller 
const sessionsRoutes = Router();
sessionsRoutes.post("/", sessionsControllers.create);

module.exports = sessionsRoutes;