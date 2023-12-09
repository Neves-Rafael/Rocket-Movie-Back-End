const knex = require("../database/knex")

class RatingController{
    //Função para calcular todas as "notas" e retornar uma media
    async index(request, response){

        const rating = await knex("rating").select("stars");
        let result;
        //Loop para calcular os valores baseado no tamanho da lista
        if(rating.length < 2){
            return response.json({
                message: "A media está em:", rating
            })
        }else{
            for (let i = 0; i < rating.length - 1; i++) {
                let sumOne = rating[i].stars
                let sumTwo = rating[i+1].stars
                console.log(sumOne)
                result = (sumOne + sumTwo) / rating.length
            }
            return response.json({
                message: "A media está em:", result
            })
        }
    }
}

module.exports = RatingController;