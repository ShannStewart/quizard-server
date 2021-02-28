const quizServices = {
    getAllQuizzes(knex) {
        return knex
        .select('*')
        .from("quizzes")
    },
    insertQuiz(knex, newQuiz) {
        return knex
        .insert(newQuiz)
        .into("quizzes")
        .returning('*')
        .then(rows => {
            return rows[0]
          })
    },
    getById(knex, id) {
        return knex
        .from("quizzes")
        .select('*')
        .where('id', id)
        .first()
    },
    updateQuiz(knex, id, newQuizInfo){
        return knex("quizzes")
        .where({ id })
        .update(newQuizInfo)
    },
    deleteQuiz(knex, id){
        return knex("quizzes")
        .where({ id })
        .delete()
    }
}

module.exports = quizServices;