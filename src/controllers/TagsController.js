//importação do knex
const knex = require("../database/knex");

class TagsController {
  async index(request, response) {
    //verificar para fazer uma busca completa de tags e não pelo user_id;
    const { user_id } = request.params;

    const tags = await knex("tags").where({ user_id });

    return response.json(tags);
  }
}

module.exports = TagsController;
