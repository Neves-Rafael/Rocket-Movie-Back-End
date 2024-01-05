//importando o Router do express
const { Router } = require("express");

//importando o users Controller para repassar a funcionalidade
const NotesController = require("../controllers/NotesController");

//importando o middleware de autenticação
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

//inicializando o Router
const notesRoutes = Router();

//instanciando a classe
const notesController = new NotesController();

//Fazendo uma requisição com o post chamando o MovieNotesController.create para gerar um novo usuário

//passando o middleware para todas as rotas
notesRoutes.use(ensureAuthenticated);

notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);
notesRoutes.get("/", notesController.index);

//exportando para quem quiser utilizar
module.exports = notesRoutes;
