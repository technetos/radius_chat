var db = require('./database');

var session = {};

session.login = function(req, res, next) {
    if(req.session.user.email == req.body.email) {
        res.json('authenticated');
    } else {
        var email       = req.body.email;
        var password    = req.body.password;
        db.authenticate(email, password, function(err, user) {
            if(err) return console.log(err);

            if(user) {
                req.session.user = {
                    email       : user.email,
                    username    : user.username
                }
                res.redirect('/index');
            } else {
                res.redirect('/login');
            }
        });
    }
};

session.logout = function(req, res, next) {

}

session.authorize = function(req, res, next) {
}

session.signup = function(req, res, next) {
    db.create(
            req.body.username,
            req.body.email,
            req.body.password,
            req.body.location,
            function(err, data) {
                if(err) {
                    return console.log(err);
                } else {
                    console.log(data);
                }
            });
    res.json("data created");
}

module.exports = session;
