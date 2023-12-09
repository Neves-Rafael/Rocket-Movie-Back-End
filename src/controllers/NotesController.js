//importação do knex
const { request } = require("express");
const knex = require("../database/knex");

class NotesController {
  //Aqui estamos criando as notas e repassando para as outras tabelas o valores
  async create(request, response) {
    const { title, description, tags, stars, rating } = request.body;
    const { user_id } = request.params;

    //Repassando informações da nota e repassando para as tags e os links
    const [note_id] = await knex("notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const starsInsert = { description, user_id, note_id, stars };

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

    response.json({ message: "A note foi excluida com sucesso!" });
  }

  //Aqui estamos criando a função para mostrar todas as notas cadastradas
  async index(request, response) {
    const { title } = request.query;

    const allNotes = await knex("notes")
      .whereLike("title", `%${title}%`)
      .orderBy("title");

    // const userTags = await knex("tags").where({ user_id });
    // const notesWithTags = notes.map(note => {
    //   const noteTags = userTags.filter(tag => tag.note_id === note.id);

    //   return{
    //     ...note,
    //     tags: noteTags
    //   }
    // })


    return response.json({ allNotes });
  }
}

module.exports = NotesController;
