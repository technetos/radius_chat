var db = require('./database');

var session = {};

session.login = function(req, res, next) { 
    console.log("sessions first");
    console.dir(req.session);
    console.log("next is the req.body");
    console.dir(req.body);
    // if the req.session.user.email is equal to req.body.email
    if(req.session.user != undefined) {
	if (req.session.user.email == req.body.email) {
	    console.log("in the first if of sessions")
	    res.status(200).send("already authenticated");
	}
    }
    console.log("In the else in Session.js")
    var email       = req.body.email;
    var password    = req.body.password;
    db.authenticate(email, password, function(err, user) {
        console.log("error: " + err + " user: " + user);
        if(err) {
    	console.error(err);
        }
        if (user) {
	    console.dir(user.toObject());
	    req.session.user = {
                email       : user.email,
                password    : user.password
	    }
        } else {
            res.status(409).send("the user was not in the database");
        }
    });
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
            req.body.geoLocation,
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
