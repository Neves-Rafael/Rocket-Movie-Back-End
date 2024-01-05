//importando o Router do express;
const { Router } = require("express");
//importando o middleware de autenticação;
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

//importação do multer
const multer = require("multer");

//importação do uploadConfig
const uploadConfig = require("../configs/upload");

//importando o users Controller para repassar a funcionalidade;
const UsersController = require("../controllers/UsersController");

//importando o controller do avatar de usuário;
const UserAvatarController = require("../controllers/UserAvatarController");

//inicializando o Router;
const usersRoutes = Router();

//configurando o multer
const upload = multer(uploadConfig.MULTER);

//instanciando as classes;
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

//Fazendo uma requisição com o post chamando o usersController.create para gerar um novo usuário;

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.get("/", ensureAuthenticated, usersController.show);

//estamos passando o multer que foi inicializado na const upload com o parâmetro de single para apenas um e o campo "avatar" para ir buscar o arquivo;
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

//exportando para quem quiser utilizar;
module.exports = usersRoutes;
