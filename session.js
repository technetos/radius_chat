var db = require('./database');

var session = {};

session.login = function(req, res, next) { 
    db.authenticate(req.body.email, req.body.password, function(err, user) {
        console.log("error: " + err + " user: " + user);
        if (err) {
	   console.error(err);
        }
        if (user != undefined) {
	    var obj = {username : req.body.username, email : req.body.email, geoLocation : req.body.geoLocation};
	    res.status(200).json(obj);
	} else {
	    res.status(404).send("user was not in database");
	}
    });
};

session.logout = function(req, res, next) {

}

session.authorize = function(req, res, next) {
}

session.signup = function(req, res, next) {
    db.create(req.body.username, req.body.email, req.body.password, req.body.geoLocation,
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
