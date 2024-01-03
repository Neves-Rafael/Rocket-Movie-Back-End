//Middleware é um tratamento para que seja apresentado o retorno como desejamos
//Aqui estamos tratando os error para que o retorno seja um pouco mais amigável e não um crash total na aplicação

class AppError {
  //variáveis no inicio de uma classe tem a propriedade de ser visto por todos em sequência
  message;
  statusCode;

  //No constructor sempre que for instanciado receber esses parâmetros para repassar o erro mantendo um padrão
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
