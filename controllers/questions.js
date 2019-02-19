const Question = require('../models/question');

/*
Here we have the routes:
  indexAll : return all questions
  randomRoute : return a random question
  createRoute : make one new question
  showRoute : show one specific question
  updateRoute : update one specific question
  deleteRout : delete one specific question
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
  console.log('show', req.params.id);
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
  // console.log('body',JSON.stringify(req.body));
  // console.log('ID',req.params.id);
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
    .then((question) => {
      res.json(question);
    })
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

function getAnswerRoute(req, res, next) {
  Question
    .findById(req.query.id)
    .exec()
    .then((question) => {
      if(!question) return res.notFound();
      if(Number(question.answer) === Number(req.query.answer)) {
        res.json('Winner');
      } else {
        res.json('Nope');
      }
    })
    .catch(next);
}

function postAnswerRoute(req, res, next) {
  Question
    .findById(req.body.id)
    .exec()
    .then((question) => {
      if(!question) return res.notFound();
      if(Number(question.answer) === Number(req.body.answer)) {
        res.json('Winner');
      } else {
        res.json('Nope');
      }
    })
    .catch(next);
}

function corsResponse(req, res) {
  // This should not be needed now the proxy is working
  // console.log('corsResponse');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'content-type');
  res.header('Access-Control-Allow-Methods', 'OPTIONS','DELETE','PUT');
  res.status(200).send();
}

module.exports = {
  index: indexAllRoute,
  random: randomRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  answerG: getAnswerRoute,
  answerP: postAnswerRoute,
  cors: corsResponse
};
