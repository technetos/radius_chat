var db = require('./database'); 

exports.login = function (req, res, next) {
	//stream line
	if (req.session.user) {
	
	}
	else {
		var email = req.body.email;
		var password = req.body.password;

		db.authenticate(email, password, function (err, user) {
			if (err) {
				return console.error(err);
			}
			if (user) {
				req.session.user = {email : user.email, username : user.username};
				res.redirect('/home');
			}
			else {
				res.redirect('/login');
			}
		});
	}
	res.send("PORQUE");
}

exports.logout = function (req, res, next) {
	delete req.session.user;
	res.redirect('/login');
}

exports.authorize = function (req, res, next) {
	if (req.session.user) {
		next();
	}
	else {
		res.redirect('/login');
	}
}

exports.signup = function (req, res, next) {
	db.create(req.body.username, req.body.email, req.body.password, req.body.location,
	function (err, data) {
		if (err) {
			return console.error(err);
		}
		else {
			console.log(data);
		}
	});
	res.send("Data created");
}
