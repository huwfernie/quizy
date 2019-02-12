const Question = require('../models/question');

/*
Here we have the routes:
  indexAll : return all questions
  createRoute : Make one new question
  showRoute : show details of one question
  updateRoute : update details of one question
  deleteRout : delete one question
*/

function indexAllRoute(req, res, next) {
  Question
    .find()
    .exec()
    .then((questions) => res.json(questions))
    .catch(next);
}

function randomRoute(req, res, next) {
  Question
    .find()
    .exec()
    .then((questions) => {
      const random = Math.floor(Math.random() * questions.length);
      const question = questions[random];
      res.json(question);
    })
    .catch(next);
}

function createRoute(req, res, next) {
  Question
    .create(req.body)
    .then((question) => res.status(201).json(question))
    .catch(next);
}

function showRoute(req, res, next) {
  Question
    .findById(req.params.id)
    .exec()
    .then((question) => {
      if(!question) return res.notFound();
      res.json(question);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Question
    .findById(req.params.id)
    .exec()
    .then((question) => {
      if(!question) return res.notFound();

      for(const field in req.body) {
        question[field] = req.body[field];
      }

      return question.save();
    })
    .then((question) => res.json(question))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Question
    .findById(req.params.id)
    .exec()
    .then((question) => {
      if(!question) return res.notFound();

      return question.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexAllRoute,
  random: randomRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
