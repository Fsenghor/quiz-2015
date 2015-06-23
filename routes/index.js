
var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {

  res.render('index', { title: 'Quiz', errors: []});
});

// Comands autoload with :quizId   executing before needed by routes show & answer
router.param('quizId', quizController.load);  //autoload--> only if quizId exist in http header: param, query, body
//if param quizID exist in route/path then --> autoload execute

// Def route  --> /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  quizController.new);
router.post('/quizes/create',              quizController.create);


/* GET author */
router.get('/author', function(req, res) {
  res.render('author', { title: 'Franck Senghor', errors: [] });
});


module.exports = router;
