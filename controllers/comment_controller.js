/**
 * Created by franck on 24/06/15.
 */

var models = require('../models/models.js');

        // Autoload :comments id ,  (pre load the comment if route has a comment identifier)
        exports.load = function(req, res, next, commentId) {
              models.Comment.find({ //give access to comments table
                            where: {
                                id: Number(commentId)  //transform identifier to NUMBER for javascript
                            }
                    }).then(function(comment) {
                      if (comment) {
                            req.comment = comment;
                            next();
                          } else{next(new Error('No existe commentId=' + commentId))}
                    }
              ).catch(function(error){next(error)});
        };


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


        // GET /quizes/:quizId/comments/:commentId/publish
       //WARNING:publish action route has comentId and NEEDS autoload
        exports.publish = function(req, res) {
            req.comment.publicado = true;

            req.comment.save( {fields: ["publicado"]})
                .then( function(){ res.redirect('/quizes/'+req.params.quizId);} )
                .catch(function(error){next(error)});

        };


