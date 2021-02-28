const path = require('path')
const express = require('express')
const xss = require('xss')
const quizServices = require('./quizzes-service');

const quizzesRouter = express.Router();
const jsonParser = express.json();

const cleanNotes = quizzes => ({
    id: quizzes.id,
    name: quizzes.name,
    questions: questions,
    count: quizzes.count,
    modified: quizzes.modified,
    published: quizzes.published
})

quizzesRouter
    .route('/')
    .get(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        quizServices.getAllQuizzes(knexInstance)
        .then( quizzes => {
            res.json(quizzes.map(cleanNotes))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { name, questions, count, modified, published } = req.body
        const newQuiz = {};
        newQuiz.name = name;
        newQuiz.questions = questions;
        newQuiz.count = count;
        newQuiz.modified = modified;
        newQuiz.published = published;


        for (const [key, value] of Object.entries(newQuiz)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                  })
            }
        }
        //console.log('test:')

        quizServices.insertQuiz(
            req.app.get('db'),  
            newQuiz
        )
        .then(quiz => {
            res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${quiz.id}`))
            .json(quiz)
        })
        .catch(next)
    })

    quizzesRouter
    .route('/:quiz_id')
    .all((req, res, next) => {
        quizServices.getById(
            req.app.get('db'),
            req.params.quiz_id
          )
        .then(quiz => {
            if (!quiz){
                return res.status(404).json({
                    error: { message: `Folder doesn't exist` }
                  })
            }
            res.quiz = quiz;
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
          res.json(cleanNotes(res.quiz))  
        })
    .patch(jsonParser, (req, res, next) => {
            const { name, questions, count, modified, published } = req.body
            const quizToUpdate = { name, questions, count, modified, published }

            const numberOfValues = Object.values(quizToUpdate).filter(Boolean).length
            if (numberOfValues === 0)
              return res.status(400).json({
                error: {
                  message: `Request body must contain 'name', 'password', 'test' or 'questions'`
                }
              })

              quizServices.updateQuiz(
                  req.app.get('db'),
                  req.params.quiz_id,
                  quizToUpdate
              )
              .then(numRowsAffected => {
                res.status(204).end()
              })
              .catch(next)
        })
    .delete((req, res, next) => {
        quizServices.deleteQuiz(
            req.app.get('db'),
            req.params.quiz_id
        )
        .then(numRowsAffected => {
            res.status(204).end()
          })
          .catch(next)
    })

    module.exports = quizzesRouter