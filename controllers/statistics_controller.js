/**
 * Created by franck on 26/06/15.
 */

 var models = require('../models/models.js');

//GET /quizes/statistics
exports.statistics = function(req, res) {
    models.Quiz.count().then(function(numberQuizes) {
        models.Comment.count().then(function(numberComments) {

            models.Quiz.findAll({  //number of questions

                include: [{
                    model: models.Comment
                }]

                    }).then(function(questions) {

                                var noCommentedQuizes = 0;
                                var commentedQuizes = 0;
                                for(i in questions) {
                                    if(questions[i].Comments.length)
                                        commentedQuizes++;
                                    else noCommentedQuizes++;
                                }


                                     if (numberQuizes === 0){//WARNING DIV PER 0  PREVENT!!!!
                                         avComtPQ = 0;
                                     }else{
                                         avComtPQ = numberComments/numberQuizes;
                                     }

                                    res.render('quizes/statistics', {

                                        quizes         : numberQuizes,
                                        comments       : numberComments,
                                        commentedQuizes: commentedQuizes,
                                        noCommentedQuizes: noCommentedQuizes,
                                        averageCommentPerQ: avComtPQ,
                                        errors: []
                                    });
                    });
            });
        }).catch(function(error) { next(error);});
};

                               //IMPORTANT:
//WARNING : LOGICAL BUG: if questionId=Deleted    -->  Destroy comments associated  with questionId in future version!!!!!!








