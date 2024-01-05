//importando o Router do express
const { Router } = require("express");

//importando o users Controller para repassar a funcionalidade
const TagsController = require("../controllers/TagsController");

//importando o middleware de autenticação
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

//inicializando o Router
const tagsRoutes = Router();

//instanciando a classe
const tagsController = new TagsController();

//Fazendo uma requisição com o post chamando o MovieNotesController.create para gerar um novo usuário e passando o middleware para a rota de tags.
tagsRoutes.get("/", ensureAuthenticated, tagsController.index);

//exportando para quem quiser utilizar
module.exports = tagsRoutes;
