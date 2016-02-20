// THIS FILE IS OUR API, EVERYTHING ELSE THAT IS NOT THIS FILE IS AT SOME POINT
// OR ANOTHER CALLED BY THIS FILE...SHIT STARTS HERE!

var express         = require('express');
var session         = require('express-sessions');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');
var path            = require('path');

// Routes

// this will only contain a prompt for the user to login or signup,
// unless the user is already authenticated, where the page will simply
// greet them with a string
var index   = require('./routes/index');

// this is the route that will handle the verification of credentials
// and session storage/retreival
var login   = require('./routes/login');

// this is the route that will handle the removal of the user session store
// and redirection of the current user at the current page back to the login
// route.
var logout  = require('./routes/logout');

// this is the route that will handle the creation of new users,
// it will store their data in the database on creation.  this
// route always redirects to our login route at the end of its execution
var signup  = require('./routes/signup');

// here we instantiate an instance of express and assign it to `server`
var server = express();

// here we configure express to accept connections from outside our domain origin
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// here we are setting the path to look in for views
server.set('view', path.join(__dirname, 'view'));
// here we are configuring express to use jade as the view engine
server.set('view engine', 'jade');

// here we configure express to use cookie-parser middleware for extracting the data from cookies
server.use(cookieParser());

// here we configure express to use 'dev' level logging
server.use(logger('dev'));
// here we configure express to use the body parsing middleware
server.use(bodyParser.json());
// here we configure express's body parser to support urlencoded
server.use(bodyParser.urlencoded({extended : false }));

// setting up session storage
var mongoose = require('mongoose');

// database object
var db = mongoose.connection;

// connect to database server
db.connect(config.mongoUrl);

// setting up session object
server.use(session({
	secret : 'rumble_from_down_under',
	cookie : {maxAge : 1000000000},
	store  : new (require('express-sessions'))({
		storage : 'mongodb',
		instance : mongoose,
		db : 'test',
		collection : 'sessions'
	});
}));

server.use('/', index);
server.use('/login', login);
server.use('/logout', logout);
server.use('/signup', signup);

// 404 handler
server.use(function(req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

if(server.get('env') === 'development') {
    server.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.status('error').json({ message : err.message, error : err });
    });
}

server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.status('error').json({ message : err.message, error : {} });
});

module.exports = server;

