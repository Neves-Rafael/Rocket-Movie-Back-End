//migrations para criação de tabela
//A criação de tabela direto pelo sql é uma outra forma de fazer (na pasta sqlite/migrations tem o exemplo)
//Porem se mudar o banco lá teríamos que fazer alterações, aqui ela se molda sem necessidade de mudanças

exports.up = (knex) =>
  knex.schema.createTable("tags", (table) => {
    //criação da tabela de tags
    table.increments("id");
    //Estamos passando o user_id pegando a referencia do id da tabela de users
    table.integer("user_id").references("id").inTable("users");
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");

    table.text("name");
  });

exports.down = (knex) => knex.schema.dropTable("tags");
