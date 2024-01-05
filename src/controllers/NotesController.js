//importação do knex
const knex = require("../database/knex");

class NotesController {
  //Aqui estamos criando as notas e repassando para as outras tabelas o valores
  async create(request, response) {
    const { title, description, tags, stars, rating } = request.body;
    const user_id = request.user.id;

    //Repassando informações da nota e repassando para as tags e os links
    const [note_id] = await knex("notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    //Pegando campos para passar a tabela rating
    const starsInsert = { user_id, note_id, stars };

    await knex("rating").insert(starsInsert);

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("tags").insert(tagsInsert);
    return response.json();
  }

  //Aqui estamos criando a função de mostrar as notas e o que está vinculado
  async show(request, response) {
    const { id } = request.params;

    //estamos pegando para mostrar as notas e tudo que está vinculado
    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const rating = await knex("rating").where({ note_id: id });

    return response.json({ ...note, tags, rating });
  }

  //Aqui estamos criando a função para deletar uma nota
  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    return response.json({ message: "A note foi excluída com sucesso!" });
  }

  //Aqui estamos criando a função para mostrar todas as notas cadastradas
  async index(request, response) {
    const { title, tags } = request.query;
    const user_id = request.user.id;

    //Aqui acontece a busca por todas as notas e temos o title que faz uma busca personalizada de acordo com o que foi passado na request.query.
    let notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      notes = await knex("tags")
        .select(["notes.id", "notes.title", "notes.user_id"])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("notes.title");
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);
      return {
        ...note,
        tags: noteTags,
      };
    });
    return response.json(notesWithTags);
  }
}

module.exports = NotesController;
