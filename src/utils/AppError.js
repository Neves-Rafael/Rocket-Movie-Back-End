//Middleware é um tratamento para que seja apresentado o retorno como desajamos
//Aqui estamos tratando os error para que o retorno seja um pouco mais amigavél e não um crash total na aplicação

class AppError {
  //variáveis no inicio de uma classe tem a propriedade de ser visto por todos em sequência
  message;
  statusCode;

  //Nosso contructor para sempre que for instanciado receber esses parametros e repassar o erro mantendo um padrão
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
