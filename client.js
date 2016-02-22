var db = require('./database');

var client = {};

client.login = function(req, res, next) { 
    db.authenticate(req.body.email, req.body.password, function(err, user) {
	if (err) {
	   console.error(err);
        }
        if (user != null) {
	    //var obj = {username : user.username, email : user.email, geoLocation : user.geoLocation};
	    console.log("client connected");
	    res.status(200).json(user);
	} else {
	    res.status(404).send("user was not in database");
	}
    });
};

client.logout = function(req, res, next) {

}

client.authorize = function(req, res, next) {

}

client.signup = function(req, res, next) {
    db.create(req.body.username, req.body.email, req.body.password, req.body.geoLocation,
    function (msg) {
	if (msg == 'entered new user') {
            console.log(msg);
	    res.status(200).send(msg);
        } else {
            console.log(msg);
	    res.status(409).send(msg);
        }
    });
}

module.exports = client;
