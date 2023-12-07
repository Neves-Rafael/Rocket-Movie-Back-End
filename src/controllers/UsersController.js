//importando AppError para verificações
const AppError = require("../utils/AppError");

//importando conexão com o sqlite
const sqliteConnection = require("../database/sqlite");

//Controller deve possuir no máximo até 5 funções
class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    //Criando conexão com o DB
    const database = await sqliteConnection();
    //verificando se o usuário já existe a partir do email, utilizamos o select para ele fazer uma busca no DB e retornar se o email enviado já está cadastrado
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)", [email]
    );

    if (checkUserExists) {
      throw new AppError(
        "Este e-email já está em uso, verifique e tente novamente!",
        400
      );
    }

    //inserindo usuários na tabela
    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password])


    return response.status(201).json({
      message: "Usuário cadastrado com sucesso!",
    });
  }
}

module.exports = UsersController;
