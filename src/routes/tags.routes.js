//importando o Router do express
const { Router } = require("express");

//importando o users Controller para repassar a funcionalidade
const TagsController = require("../controllers/TagsController");

//inicializando o Router
const tagsRoutes = Router();

//instanciando a classe
const tagsController = new TagsController();

//Fazendo uma requisição com o post chamando o MovieNotesController.create para gerar um novo usuário
//Query Params

tagsRoutes.get("/:user_id", tagsController.index);


//exportando para quem quiser utilizar
module.exports = tagsRoutes;
