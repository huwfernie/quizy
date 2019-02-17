const router = require('express').Router();
const questions = require('../controllers/questions');

// Questions

router.route('/allQuestions')
  .get(questions.index);

router.route('/question')
  .options(questions.cors)
  .get(questions.random)
  .post(questions.create);

router.route('/question/:id')
  .options(questions.cors)
  .get(questions.show)
  .put(questions.update)
  .delete(questions.delete);

router.route('/answer')
  .options(questions.cors)
  .get(questions.answerG)
  .post(questions.answerP);

// catch all - 404
router.all('/*', (req, res) => res.notFound());

module.exports = router;
