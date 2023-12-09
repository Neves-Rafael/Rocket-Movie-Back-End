//migrations para criação de tabela
//A criação de tabela direto pelo sql é uma outra forma de fazer (na pasta sqlite/migrations tem o exemplo)
//Porem se mudar o banco de dados lá teriamos que fazer alterações, aqui ela se molda sem necessidade de mudanças

exports.up = (knex) =>
  knex.schema.createTable("users", (table) => {
    //criação da tabela de notas
    table.increments("id");
    table.text("name");
    table.text("email");
    table.text("password");
    table.text("avatar");

    //No default passamos uma função para atribuir o tempo
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
    table.boolean("admin");
  });

exports.down = (knex) => knex.schema.dropTable("users");
