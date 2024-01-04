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

    //Criando conexão com o DB;
    // const database = await sqliteConnection();

    //verificando se o usuário já existe a partir do email, utilizamos o select para ele fazer uma busca no DB e retornar se o email enviado já está cadastrado;

    const checkUserExists = await knex("users").where({ email }).first();

    // const checkUserExists = await database.get(
    //   "SELECT * FROM users WHERE email = (?)",
    //   [email]
    // );

    if (checkUserExists) {
      throw new AppError(
        "Este e-email já está em uso, verifique e tente novamente!",
        400
      );
    }

    //Criptografando a senha;
    const hashedPassword = await hash(password, 8);

    //inserindo usuários na tabela
    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return response.status(201).json({
      message: "Usuário cadastrado com sucesso!",
    });
  }

  //atualização do usuário;
  async update(request, response) {
    //pegando os parâmetros;
    const { old_password, new_password, email, name } = request.body;
    const { id } = request.params;

    //conectando com o DB;
    const database = await sqliteConnection();

    //Buscando o usuário;
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    //Verificando se o usuário existe;
    if (!user) {
      throw new AppError(
        "Usuário não encontrado, verifique seu ID e tente novamente",
        400
      );
    }

    //buscando email;
    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

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
    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now') 
      WHERE id = ?
    `,
      [user.name, user.email, user.password, user.id]
    );

    //resposta de confirmação;
    return response.status(200).json({
      message: "Usuário atualizado com sucesso",
    });
  }

  async show(request, response) {
    const { id } = request.params;

    const user = await knex("users")
      .where({ id })
      .select("id", "name", "email", "admin")
      .first();

    if (user.admin !== 1) {
      throw new AppError(
        "você não tem permissão de administrador para acessar",
        400
      );
    }

    return response.json({ user });
  }
}

module.exports = UsersController;
