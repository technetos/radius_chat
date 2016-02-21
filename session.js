var db = require('./database');

var session = {};

session.login = function(req, res, next) {
	db.authenticate(req.body.email, req.body.password, function (err, user) {
		if (err) {
			console.error(err);
		}
		if (user != null) {
			var obj = {username : req.body.username, email : req.body.email, geoLocation : req.body.geoLocation};
			res.status(200).json(obj);
		}
		else {
			res.status(404).send("Item not found");
		}
	});
}

session.logout = function(req, res, next) {

}

session.authorize = function(req, res, next) {
}

session.signup = function(req, res, next) {
	db.create(req.body.username, req.body.email, req.body.password, req.body.geoLocation,
	function (err, data) {
		if (err) {
			return console.log(err);
		}
		else {
			console.log(data);
		}
	});
	res.json("data created");
}

module.exports = session;
