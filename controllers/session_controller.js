/**
 * Created by franck on 25/06/15.
 */


        //restricted  HTTP access authorization MW
        exports.loginRequired = function(req, res, next){
        if (req.session.user) {
                next();
            } else {
                res.redirect('/login');
            }
    };



       //Get /login :login form
        exports.new = function(req, res) {
        var errors = req.session.errors || {};
        req.session.errors = {};

            res.render('sessions/new', {errors: errors});
    };

        //POST /login :Create  session
        exports.create = function(req, res) {

            var login     = req.body.login;
        var password  = req.body.password;

            var userController = require('./user_controller');
        userController.autenticar(login, password, function(error, user) {

                    if (error) {  //if error return message --> error session
                        req.session.errors = [{"message": 'Se ha producido un error: '+error}];
                        res.redirect("/login");
                        return;
                    }

                        //Create req.session.user & save fields   id  &  username
                        //session is defined by existence of:    req.session.user
                            req.session.user = {id:user.id, username:user.username};

                    res.redirect(req.session.redir.toString());//redirect to path anterior before login
            });
    };

       //DELETE /logout  :Destroy session
        exports.destroy = function(req, res) {
        delete req.session.user;
        res.redirect(req.session.redir.toString()); //redirect to path anterior before login
    };