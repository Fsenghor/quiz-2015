/**
 * Created by franck on 25/06/15.
 */


var users = { admin: {id:1, username:"admin", password:"1234"},
                  pepe:  {id:2, username:"pepe",  password:"5678"}
            };

        //check if user registred in users
        //if authentication fails or there are errors -> callback(error) execute
            exports.autenticar = function(login, password, callback) {

        if(users[login]){
                if(password === users[login].password){
                        callback(null, users[login]);
                    }
                else { callback(new Error('Password erróneo.')); }
        } else { callback(new Error('No existe el usuario.'));}

    };