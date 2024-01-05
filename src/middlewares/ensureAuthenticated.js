//Verify é uma função disponível dentro do jsonwebtoken;
const { verify } = require("jsonwebtoken");

//Importando o AppError para tratamento personalizado;
const AppError = require("../utils/AppError");

//importando o authConfig para verificar o status de autenticação;
const authConfig = require("../configs/auth");

//função para garantirmos que o usuário esteja autenticado;
function ensureAuthenticated(request, response, next) {
  //acessando o cabeçalho da requisição e buscando o token em authorization;
  const authHeader = request.headers.authorization;

  //verificando se o token realmente existe;
  if (!authHeader) {
    throw new AppError("Usuário não autenticado", 401);
  }

  //aplicando um split e separando o token e passando o valor para a variável token;
  const [, token] = authHeader.split(" ");

  //no try verificamos se o token é valido, com a função verify, passando o token atual e o que está dentro do authConfig. Convertermos o sub para user_id (sub) é o conteúdo de resposta que está dentro da função verify caso o token seja valido;
  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    //criando uma requisição ainda inexistente chamada user e atribuindo o valor do user_id;
    request.user = {
      id: Number(user_id),
    };

    //se chegou nesse ponto tudo está correto e chamamos a proxima requisição;
    return next();
  } catch {
    //error caso algo não esteja correto;
    throw new AppError("Token inválido", 401);
  }
}

module.exports = ensureAuthenticated;
