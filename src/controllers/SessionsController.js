//Importando conexão com o bando de dados
const knex = require("../database/knex");

//Importando o Hash do Bcrypt e o compare para verificar senhas apos a criptografia;
const { compare } = require("bcryptjs");

//importando o authConfig para gerar o token
const authConfig = require("../configs/auth");

//função de sign para gerar o token
const { sign } = require("jsonwebtoken");

//Importando o AppError para tratamento personalizado
const AppError = require("../utils/AppError");

//classe para controlar a seção de autenticação
class SessionsController {
  //criando a conexão do usuário
  async create(request, response) {
    const { email, password } = request.body;

    //buscando o user no DB
    const user = await knex("users").where({ email }).first();

    //verificando se o user existe e lançando um new error
    if (!user) {
      throw new AppError("E-mail ou senha inválidos", 401);
    }

    //verificando se a senha bate com a criptografia
    const passwordMatched = await compare(password, user.password);

    //verificando se existe um retorno da comparação de senha e lançando um new erro
    if (!passwordMatched) {
      throw new AppError("E-mail ou senha inválidos", 401);
    }

    //capturando os dados do authConfig
    const { secret, expiresIn } = authConfig.jwt;

    //gerando o token e passando os dados do user convertido em string e o tempo de expiração
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.json({ user, token });
  }
}

module.exports = SessionsController;
