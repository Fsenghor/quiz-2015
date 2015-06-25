/**
 * Created by franck on 19/06/15.
 */

var path = require('path');


// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;


// load ORM model
var Sequelize = require('sequelize');

// Using BD SQLite or Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
      { dialect:  protocol,
        protocol: protocol,
        port:     port,
        host:     host,
        storage:  storage,  // only SQLite (.env)
        omitNull: true      // only Postgres
  }
);


//table Quiz def import
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

//table Comment def import
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // export table Quiz
exports.Comment = Comment;


//table Quiz export
exports.Quiz = Quiz;



sequelize.sync().then(function() { //sequelize.sync() create & initialize quest table  in DB
    //then(..) execut callback when table is created
    Quiz.count().then(function (count){
        if(count === 0) {   // table se initialized if empty

            Quiz.create({ pregunta: 'Capital de Italia',
                respuesta: 'Roma',
                tema: 'Humanidades'
            })
            Quiz.create({ pregunta: 'Capital de Portugal',
                respuesta: 'Lisboa',
                tema: 'Humanidades'
            })
            Quiz.create({ pregunta: 'Capital de Noruega',
                respuesta: 'Oslo',
                tema: 'Humanidades'
            })
            Quiz.create({ pregunta: 'Valor de Phi -> 3 decimales: x.xxx',
                respuesta: '1.618',
                tema: 'Ciencia'
            })
                .then(function(){console.log('Base de datos inicializada')});

        };//end if
    });
});//end callback



