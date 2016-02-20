// requiring db related middleware
var mongoose = require('mongoose');
var config = require('./config/config');
var cuid = require('cuid');
var crypto = require('crypto');

var db = mongoose.connection;

// requiring user mongoose model
var User = require('models/user');
var table = 'users';

db.on('error', console.error);

// connection to db on the server
mongoose.connect(config.mongoUrl);

// voodoo hash function
function hash (text) {
	return crpyto.createHash('sha1').update(text).digest('base64');
}

exports.create = function (username, email, password, location, callback) {
	// creates our user document to be saved into the db
	var user = new User({
		_id : cuid(),
		username : username,
		email : email,
		password : hash(password),
		location : {
			longitude : location.longitude,
			latitude : location.latitude
		}
	});
	
	// saves the user into the users collection
	user.save(function (err) {
		if (err) {
			return console.error(err);
		}
	});

	res.send("Data added successfully");
});

exports.remove = function (username, callback) {
	// removes the user with the passed in username
	User.remove({username : username}, function (err) {
		if (err) {
			return console.error(err);
		}
	});
});

exports.get = function (username, callback) {
	// queries database for a given user and returns it
	User.findOne({username : username}, {_id : false}, function (err, result) {
		if (err) {
			return console.error(err);
		}
		// if the user is not in the database, return 404
		if (result == null) {
			res.status(404).send("User not found");
		}
		// else return the user object
		else {
			res.json(result);
		}
	});
});

exports.all = function (callback) {
	User.find({}, {_id : false}, function (err, result) {
		if (err) {
			return console.error(err);
		}
		// if the user is not in the database, return 404
		if (result == null) {
			res.status(404).send("User not found");
		}
		// else return the user object
		else {
			res.json(result);
		}
	});
}

exports.authenticate = function (username, password, callback) {
	// queries database for a given user and returns it
	User.findOne({username : username}, {_id : false}, function (err, result) {
		if (err) {
			return console.error(err);
		}
		
		// if password is correct
		if (result.password === hash(password)) {
			callback(null, result);
		}
		else {
			callback();
		}
	});
}
