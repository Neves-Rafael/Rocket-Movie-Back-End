const knex = require("../database/knex");

class RatingController {
  //Função para calcular todas as "notas" e retornar uma media
  async index(request, response) {
    const rating = await knex("rating").select("stars");

    //Loop para calcular os valores baseado no tamanho da lista
    if (rating.length < 2) {
      return response.json({
        message: "A media está em:",
        rating,
      });
    } else {
      let sum = 0;
      for (let i = 0; i < rating.length; i++) {
        sum += rating[i].stars;
      }
      let result = sum / rating.length;
      return response.json({
        message: "A media está em:",
        result: result,
      });
    }
  }
}

module.exports = RatingController;
