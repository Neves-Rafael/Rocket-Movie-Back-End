//migrations para criação de tabela
//A criação de tabela direto pelo sql é uma outra forma de fazer (na pasta sqlite/migrations tem o exemplo)
//Porem se mudar o banco lá teríamos que fazer alterações, aqui ela se molda sem necessidade de mudanças

exports.up = (knex) =>
  knex.schema.createTable("notes", (table) => {
    //criação da tabela de notas
    table.increments("id");
    table.text("title");
    table.text("description");
    table.integer("rating");
    //Estamos passando o user_id pegando a referencia do id da tabela de users
    table.integer("user_id").references("id").inTable("users");

    //No default passamos uma função para atribuir o tempo
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("notes");
