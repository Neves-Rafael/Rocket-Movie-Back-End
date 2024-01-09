//importação do knex
const knex = require("../database/knex");

class TagsController {
  async index(request, response) {
    //pegando o id do usuário da autenticação;
    const user_id = request.user.id;

    //buscando as tags
    const tags = await knex("tags").where({ user_id }).groupBy("name");

    return response.json(tags);
  }
}

module.exports = TagsController;
