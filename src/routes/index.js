const { Router} = require("express");

//Objetivo é reunir todas as rotas em só arquivo

const usersRoutes = require("./users.routes")
const notesRoutes = require("./notes.routes");
const tagsRoutes = require("./tags.routes");

const routes = Router();

//Redireciona o caminho de "/users" para usersRoutes e no userRoutes passamos apenas o / já que enviamos daqui o caminho
routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsRoutes);

module.exports = routes;