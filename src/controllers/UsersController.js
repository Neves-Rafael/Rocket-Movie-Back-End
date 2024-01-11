//Importando o Hash do Bcrypt e o compare para verificar senhas apos a criptografia;
const { hash, compare } = require("bcryptjs");
const knex = require("../database/knex");

//importando AppError para verificações;
const AppError = require("../utils/AppError");

//importando conexão com o sqlite substituído pelo knex;
// const sqliteConnection = require("../database/sqlite");

//Controller deve possuir no máximo até 5 funções;
class UsersController {
  //Criação do usuário;
  async create(request, response) {
    const { name, email, password, admin } = request.body;

    //Criando conexão com o DB antiga, substituído pelo knex;
    // const database = await sqliteConnection();

    //verificando se o usuário já existe a partir do email, utilizamos o select para ele fazer uma busca no DB e retornar se o email enviado já está cadastrado;
    const checkUserExists = await knex("users").where({ email }).first();

    if (checkUserExists) {
      throw new AppError(
        "Este e-email já está em uso, verifique e tente novamente!",
        400
      );
    }

    //Criptografando a senha;
    const hashedPassword = await hash(password, 8);

    //inserindo usuários na tabela
    await knex("users").insert({
      name,
      email,
      admin,
      password: hashedPassword,
    });

    return response.status(201).json({
      message: "Usuário cadastrado com sucesso!",
    });
  }

  //atualização do usuário;
  async update(request, response) {
    //pegando os parâmetros;
    const { old_password, new_password, email, name } = request.body;
    const user_id = request.user.id;

    //Buscando o usuário;
    const user = await knex("users").where({ id: user_id }).first();

    //Verificando se o usuário existe;
    if (!user) {
      throw new AppError(
        "Usuário não encontrado, verifique seu ID e tente novamente",
        400
      );
    }

    //buscando email;
    const userWithUpdatedEmail = await knex("users").where({ email }).first();

    //verificando se o email alterado já está existente;
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email já está em uso, tente novamente!");
    }

    //se chegou até aqui após todas as etapas de verificação significa que podemos atualizar o usuário;
    //Fazemos uma verificação se o name ou email não forem passados com nullish operator;
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    //verificação se possui a senha;
    if (new_password && !old_password) {
      throw new AppError(
        "Você precisa adicionar a senha antiga para atualizar!"
      );
    }

    //verificando se as 2 senhas existem;
    if (new_password && old_password) {
      //comparando se as senhas são iguais;
      const checkPassword = await compare(old_password, user.password);

      //se a senha não for igual;
      if (!checkPassword) {
        throw new AppError("A senha antiga não confere");
      }

      if (new_password === old_password) {
        throw new AppError("A nova senha deve ser diferente da antiga");
      }

      //se passou por todas as etapas de verificação atualizamos a senha;
      user.password = await hash(new_password, 8);
    }

    //enviando a atualização dos dados atualizados;
    //Passando o datetime por uma função do banco de dados;

    await knex("users").where({ id: user_id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now(),
    });

    //resposta de confirmação;
    return response.status(200).json({
      message: "Usuário atualizado com sucesso",
    });
  }

  //função para listar todos os usuários somente se possuir permissão de administrador;
  async show(request, response) {
    //pegando o id do usuário da autenticação;
    const user_id = request.user.id;
    const { id } = request.params;

    //buscando na tabela de users se possui ou não a permissão de administrador;
    const user = await knex("users").where({ id }).select("name").first();

    const showUsers = await knex("users").select(
      "name",
      "email",
      "admin",
      "created_at",
      "updated_at"
    );
    return response.json({ user });
  }
}

module.exports = UsersController;
