const AppError = require("../utils/AppError")

//Controller deve possuir no máximo até 5 funções
class UsersController {
  create(request, response) {
    const { name, email, password } = request.body;

    if(!name){
        throw new AppError("Nome é obrigatório")  
    }

    response.json({ name, email, password });
  }
}

module.exports = UsersController;
