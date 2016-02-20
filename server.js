var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Routes go here
var index = require('./routes/index');

var server = express();

// view engine set up
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');

// configuring express
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended : false}));
server.use(cookieParser());

server.use('/', index);

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
