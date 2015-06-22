/**
 * Created by franck on 17/06/15.
 */


var models = require('../models/models.js');


      // Autoloadcode fact if route include: quizId= identifier of object to pre load from data base
      exports.load = function(req, res, next, quizId) {
      models.Quiz.find(quizId).then(//searc in data base quizId
            function(quiz) {
                  if (quiz) {
                        req.quiz = quiz;//if object exist --> assign to  var:quiz  of object:req of header
                        next();
                      } else { next(new Error('No existe quizId=' + quizId)); }// obj:quizID  No exist in data base
                }
          ).catch(function(error) { next(error);});//if exist another kind of error during the search find()
      };


       //GET /quizes
    exports.index = function(req, res) {

    var searchP = req.query.search || "";//initialized with searchValue or emptyString
        searchP = "%" + searchP.replace(/\s/g, "%") + "%";//string surrounded by %, & space replace by %

    models.Quiz.findAll( {where: ["pregunta like ?", searchP],order: ['pregunta']} ).then(   //search in aphabetic position

            function(quizes) {
                res.render('quizes/index', { quizes: quizes});
            }

          ).catch(function(error) { next(error);})
    };



    //GET /quizes/:id
    exports.show = function(req, res) {
        res.render('quizes/show', { quiz: req.quiz});
    };


    //GET /quizes/:id/answer
    exports.answer = function(req, res){
      var resultado = 'Incorrecto';
      if (req.query.respuesta === req.quiz.respuesta) {
            resultado = 'Correcto';
          }
      res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
    };


      //GET /quizes/new
    exports.new = function(req, res) {
      var quiz = models.Quiz.build(
            {pregunta: "Pregunta", respuesta: "Respuesta"}
          );

          res.render('quizes/new', {quiz: quiz});
    };


        //POST /quizes/create
    exports.create = function(req, res) {
      var quiz = models.Quiz.build( req.body.quiz );

           //save in  DB los fields pregunta & respuesta --> quiz
              quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
                    res.redirect('/quizes');
                  })   // res.redirect: Redirect  HTTP (relative URL) a questions list
    };
