//Importando conexão com o bando de dados
const knex = require("../database/knex");

//Importando o Hash do Bcrypt e o compare para verificar senhas apos a criptografia;
const { compare } = require("bcryptjs");

//Importando o AppError para tratamento personalizado
const AppError = require("../utils/AppError");

//classe para controlar a seção de autenticação
class SessionsController {
  //criando a conexão do usuário
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if(!user){
        throw new AppError('E-mail ou senha inválidos', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
        throw new AppError('E-mail ou senha inválidos', 401);
    }

    return response.json({ user });
  }
}

module.exports = SessionsController;
