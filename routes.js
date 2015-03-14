var passport = require('passport');
var Account = require('./models/account');

module.exports = function (app) {

    // show homepage
    app.get('/', function (req, res) {
        res.render('index', { user : req.user });
    });

    // show registration form
    app.get('/register', function(req, res) {
        res.render('register', { });
    });

    // handle new user registrations, then redirect to homepage
    app.post('/register', function(req, res) {
        Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
            if (err) {
                return res.render('register', { account : account });
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
    });
    // show login form
    app.get('/login', function(req, res) {
        res.render('login', { user : req.user });
    });

    // handle login attempt
    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    });

    // handle logout and redirect to homepage
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // handle testing server availability
    app.get('/ping', function(req, res){
        res.send("pong!", 200);
    });

};
