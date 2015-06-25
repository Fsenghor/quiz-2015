/**
 * Created by franck on 24/06/15.
 */

var models = require('../models/models.js');

        //GET /quizes/:quizId/comments/new
        exports.new = function(req, res) {
      res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
    };

       //POST /quizes/:quizId/comments
        exports.create = function(req, res) {
      var comment = models.Comment.build(
              { texto: req.body.comment.texto,
                QuizId: req.params.quizId
            });

      comment
  .validate()
  .then(
        function(err){
              if (err) {
                    res.render('comments/new.ejs', {comment: comment, quizid: req.params.quizId, errors: err.errors});
                  } else {
                    comment // save: save in  DB comment text field
                    .save()
                    .then( function(){ res.redirect('/quizes/'+req.params.quizId)})
                  }      // res.redirect: Redirect HTTP questions list
            }
      ).catch(function(error){next(error)});

    };