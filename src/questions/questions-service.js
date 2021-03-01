const questionService = {
    getAllQuestions(knex) {
        return knex
        .select('*')
        .from("questions")
    },
    insertQuestion(knex, newQuestion) {
        return knex
        .insert(newQuestion)
        .into("questions")
        .returning('*')
        .then(rows => {
            return rows[0]
          })
    },
    getById(knex, id) {
        return knex
        .from("questions")
        .select('*')
        .where('id', id)
        .first()
    },
    updateQuestion(knex, id, newQuestionInfo){
        return knex("questions")
        .where({ id })
        .update(newQuestionInfo)
    },
    deleteQuestion(knex, id){
        return knex("quizzes")
        .where({ id })
        .delete()
    }
}

module.exports = questionService;