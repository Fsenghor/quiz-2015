
var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {

  res.render('index', { title: 'Quiz', errors: []});
});

// Comands autoload with :quizId   executing before needed by routes show & answer
router.param('quizId', quizController.load);  //autoload--> only if quizId exist in http header: param, query, body
//if param quizID exist in route/path then --> autoload execute

// Definición de rutas de sesion
router.get('/login',  sessionController.new);     //form login
router.post('/login', sessionController.create);  //create session
router.get('/logout', sessionController.destroy); //destroy session  WARNING:get works but is NOT correct, use delete instead


// Def route  --> /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', 				   sessionController.loginRequired, quizController.new);
router.post('/quizes/create',              sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);
router.get('/quizes/:quizId(\\d+)/comments/new',            commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',              commentController.create);


/* GET author */
router.get('/author', function(req, res) {
  res.render('author', { title: 'Franck Senghor', errors: [] });
});


module.exports = router;
