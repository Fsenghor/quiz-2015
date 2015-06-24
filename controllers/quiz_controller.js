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





exports.load = function(req, res, next, quizId) {
    models.Quiz.find(quizId).then(
        function(quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else{next(new Error('No existe quizId=' + quizId))}
        }
    ).catch(function(error){next(error)});
};


//GET /quizes
    exports.index = function(req, res) {

    var searchP = req.query.search || "";//initialized with searchValue or emptyString
        searchP = "%" + searchP.replace(/\s/g, "%") + "%";//string surrounded by %, & space replace by %

    models.Quiz.findAll( {where: ["pregunta like ?", searchP],order: ['pregunta']} ).then(   //search in aphabetic position

            function(quizes) {
                res.render('quizes/index.ejs', {quizes: quizes, errors: []});
            }

          ).catch(function(error) { next(error);})
    };




    //GET /quizes/:id
    exports.show = function(req, res) {
        res.render('quizes/show', { quiz: req.quiz, tema: req.quiz.tema, errors: []});
    };


    //GET /quizes/:id/answer
    exports.answer = function(req, res){
      var resultado = 'Incorrecto';
      if (req.query.respuesta === req.quiz.respuesta) {
            resultado = 'Correcto';
          }
      res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
    };


      //GET /quizes/new
    exports.new = function(req, res) {
      var quiz = models.Quiz.build(
            {pregunta: "Pregunta", respuesta: "Respuesta", tema: "Otro"}
          );

          res.render('quizes/new', {quiz: quiz, errors: []});
    };




      //POST /quizes/create
    exports.create = function(req, res) {
    var quiz = models.Quiz.build( req.body.quiz );

    quiz
    .validate()
    .then(
            function(err){
                  if (err) {
                        res.render('quizes/new', {quiz: quiz, errors: err.errors});
                      } else {
                        quiz //save in  DB los fields pregunta & respuesta --> quiz
                        .save({fields: ["pregunta", "respuesta", "tema"]})
                        .then( function(){ res.redirect('/quizes')})
                      }      //res.redirect: Redirect  HTTP (relative URL) a questions list
            }
         ).catch(function(error){next(error)});
};



      //GET /quizes/:id/edit
    exports.edit = function(req, res) {
      var quiz = req.quiz;  //req.quiz: autoload ---> quiz intance

          res.render('quizes/edit', {quiz: quiz, errors: []});
    };


        //PUT /quizes/:id
    exports.update = function(req, res) {
        req.quiz.pregunta  = req.body.quiz.pregunta;
        req.quiz.respuesta = req.body.quiz.respuesta;
        req.quiz.tema = req.body.quiz.tema;

        req.quiz
        .validate()
        .then(
            function(err){
                  if (err) {
                        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
                      } else {
                        req.quiz     //save in  DB los fields pregunta & respuesta
                        .save( {fields: ["pregunta", "respuesta", "tema"]})
                        .then( function(){ res.redirect('/quizes');});
                      }     //res.redirect: Redirect  HTTP (relative URL) a questions list
            }
        ).catch(function(error){next(error)});
    };


         //DELETE /quizes/:id
     exports.destroy = function(req, res) {
      req.quiz.destroy().then( function() {
            res.redirect('/quizes');
          }).catch(function(error){next(error)});
      }
