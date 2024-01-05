//importação do knex para conectar ao banco de dados;
const knex = require("../database/knex");

//importando o AppError para tratamento personalizado;
const AppError = require("../utils/AppError");

//importando o DiskStorage
const DiskStorage = require("../providers/DiskStorage");

//classe para controlar o update do avatar;
class UserAvatarController {
  async update(request, response) {
    //pegando o id do usuário da autenticação;
    const user_id = request.user.id;

    //pegando o nome do arquivo;
    const avatarFilename = request.file.filename;

    //instanciando o DiskStorage
    const diskStorage = new DiskStorage();

    //buscando o usuário de acordo com a autenticação
    const user = await knex("users").where({ id: user_id }).first();

    //se o user não existir lançando erro de autenticação;
    if (!user) {
      throw new AppError("Usuário não autenticado", 401);
    }

    //se o user tiver um avatar, deletamos o antigo
    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    //salvando o arquivo no diskStorage
    const filename = await diskStorage.saveFile(avatarFilename);

    //passando o nome do arquivo para o user no campo avatar
    user.avatar = filename;

    //atualizando o user com o knex
    await knex("users").update(user).where({ id: user_id });

    return response.json(user);
  }
}

module.exports = UserAvatarController;
