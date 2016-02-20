var db = require('./database');

var session = {};

session.login = function(req, res, next) {
}

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
