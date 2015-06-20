/**
 * Created by franck on 19/06/15.
 */

var path = require('path');

        //load  Model ORM
        var Sequelize = require('sequelize');

        //Use BD SQLite:
        var sequelize = new Sequelize(null, null, null,
                           {dialect: "sqlite", storage: "quiz.sqlite"}
                        );


          //Import  def of table Quiz in quiz.js
        var Quiz = sequelize.import(path.join(__dirname,'quiz'));

        exports.Quiz = Quiz; // export def of table Quiz



        sequelize.sync().success(function() { //sequelize.sync() create & initialize quest table  in DB
                      //success(..) execut callback when table is created
                  Quiz.count().success(function (count){
                        if(count === 0) {   // table se initialized if empty
                              Quiz.create({ pregunta: 'Capital de Italia',
                                  	            respuesta: 'Roma'
                              	         })
                          .success(function(){console.log('Base de datos inicializada')});
                        };//end if
                   });
        });//end callback