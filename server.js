var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');

// Routes go here
var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var signup = require('./routes/signup');
var home = require('./routes/home');
//var auth = require('./routes/auth');

var server = express();

server.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

server.use(cookieParser());

server.use(session({
	cookieName : 'session',
	secret : 'rumble_from_down_under',
	duration : 30 * 60 * 1000,
	activeDuration : 5 * 60 * 1000
}));

// view engine set up
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');

// configuring express
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : false}));

server.use('/', index);
server.use('/login', login);
server.use('/logout', logout);
server.use('/signup', signup);
server.use('/home', home);

// 404 handler
server.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler, will print stack traces
if (server.get('env') === 'development') {
	server.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.status('error').json({message : err.message, error : err});
	});
}

// production error handler, does not print stack traces
server.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json('error').json({message : err.message, error : {} });
});

module.exports = server;
