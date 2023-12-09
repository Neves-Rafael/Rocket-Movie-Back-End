const knex = require("../database/knex")

class RatingController{
    async index(request, response){
        const { id} = request.params;

        const rating = await knex("rating").select("stars")
        let result;
        for (let i = 0; i < rating.length - 1; i++) {
            let sumOne = rating[i].stars
            let sumTwo = rating[i+1].stars
            result = (sumOne + sumTwo) / rating.length

        }
        console.log(result)

        return response.json({
            message: "A media está em:", result
        })
    }
}

module.exports = RatingController;