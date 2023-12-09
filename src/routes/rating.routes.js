//importando o Router do express
const { Router } = require("express");

//importando o users Controller para repassar a funcionalidade
const RatingController = require("../controllers/RatingController");

//inicializando o Router
const ratingRoutes = Router();

//instanciando a classe
const ratingController = new RatingController();

//Fazendo uma requisição com o post chamando o MovieNotesController.create para gerar um novo usuário
//Query Params

ratingRoutes.get("/:user_id", ratingController.index);


//exportando para quem quiser utilizar
module.exports = ratingRoutes;
