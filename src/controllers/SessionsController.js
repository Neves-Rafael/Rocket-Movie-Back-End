//classe para controlar a seção de autenticação
class SessionsController {
    //criando a conexão do usuário
    async create(request, response) {
        const { email, password } = request.body;
        return response.json({email, password});
    }
}

module.exports = SessionsController;