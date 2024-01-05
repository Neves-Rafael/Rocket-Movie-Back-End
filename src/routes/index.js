//Importando o Router do express para ligar com as rotas
const { Router } = require("express");

//Objetivo é reunir todas as rotas em só arquivo

const usersRoutes = require("./users.routes");
const notesRoutes = require("./notes.routes");
const tagsRoutes = require("./tags.routes");
const ratingRoutes = require("./rating.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

//Redireciona o caminho de solicitação para as routes e redirecionamos para o seu local especifico por exemplo o userRoutes
routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsRoutes);
routes.use("/rating", ratingRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;
