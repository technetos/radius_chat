var User = require('models/user');

exports.login = function (req, res, next) {
	if (req.session.user) {
		// enter where they should go
		res.redirect('/home');
	}

	var username = req.body.username;
	var password = req.body.password;

	User.authenticate(username, password, function (err, user) {
		if (err) {
			return console.error(err);
		}

		if (user) {
			req.session.user = {username : user.username};
			res.redirect('/home');
		}
		else {
			res.redirect('/login');
		}
	});
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
	User.create(req.body.username, req.body.email, req.body.password, req.body.location,
	function (err, data) {
		if (err) {
			return console.error(err);
		}
		else {
			console.log(data);
		}
	});
}
