class AppError {
  //variáveis no inicio de uma classe tem a propriedade de ser visto por todos em sequência
  message;
  statusCode;
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;