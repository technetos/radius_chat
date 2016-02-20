var db = require('./database');

exports.login = function (req, res, next) {
	if (req.session.user) {
		// enter where they should go
		res.redirect('/home');
	}

	var email = req.body.email;
	var password = req.body.password;

	db.authenticate(email, password, function (err, user) {
		if (err) {
			return console.error(err);
		}

		if (user) {
			req.session.user = db.get(user.email);
			res.json(req.session.user);
		}
		else {
			res.redirect('/login');
		}
	});

	res.send("Logged in");
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
