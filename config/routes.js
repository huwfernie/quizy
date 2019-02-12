const router = require('express').Router();
const questions = require('../controllers/questions');

// Questions

router.route('/allQuestions')
  .get(questions.index);

router.route('/question')
  .get(questions.random)
  .post(questions.create);

router.route('/question/:id')
  .get(questions.show)
  .put(questions.update)
  .delete(questions.delete);

// catch all - 404
router.all('/*', (req, res) => res.notFound());

module.exports = router;
