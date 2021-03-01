const path = require('path')
const express = require('express')
const xss = require('xss')
const questionService = require('./questions-service');

const questionsRouter = express.Router();
const jsonParser = express.json();

const cleanNotes = questions => ({
    id: questions.id,
    question: questions.question,
    answer: questions.answer,
    choices: questions.choices,
    test: questions.test,
    userid: questions.userid,
    used: questions.used
})

questionsRouter
    .route('/')
    .get(jsonParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        questionServices.getAllQuestions(knexInstance)
        .then( questions => {
            res.json(questions.map(cleanNotes))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { question, answer, choices, test, userid, used } = req.body
        const newQuestion = {};
        newQuestion.question = question;
        newQuestion.answer = answer;
        newQuestion.choices = choices;
        newQuestion.test = test;
        newQuestion.userid = userid;
        newQuestion.used = used;


        for (const [key, value] of Object.entries(newQuestion)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                  })
            }
        }
        //console.log('test:')

        questionServices.insertQuestions(
            req.app.get('db'),  
            newQuestion
        )
        .then(question => {
            res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${question.id}`))
            .json(question)
        })
        .catch(next)
    })

    questionsRouter
    .route('/:question_id')
    .all((req, res, next) => {
        questionServices.getById(
            req.app.get('db'),
            req.params.question_id
          )
        .then(question => {
            if (!question){
                return res.status(404).json({
                    error: { message: `Folder doesn't exist` }
                  })
            }
            res.question = question;
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
          res.json(cleanNotes(res.question))  
        })
    .patch(jsonParser, (req, res, next) => {
            const { question, answer, choices, test, userid, used } = req.body
            const questionToUpdate = { question, answer, choices, test, userid, used }

            const numberOfValues = Object.values(questionToUpdate).filter(Boolean).length
            if (numberOfValues === 0)
              return res.status(400).json({
                error: {
                  message: `Request body must contain 'name', 'password' or 'test'`
                }
              })

              questionServices.updateQuestion(
                  req.app.get('db'),
                  req.params.question_id,
                  questionToUpdate
              )
              .then(numRowsAffected => {
                res.status(204).end()
              })
              .catch(next)
        })
    .delete((req, res, next) => {
        questionServices.deleteQuestion(
            req.app.get('db'),
            req.params.question_id
        )
        .then(numRowsAffected => {
            res.status(204).end()
          })
          .catch(next)
    })

    module.exports = questionsRouter