// THIS FILE IS OUR API, EVERYTHING ELSE THAT IS NOT THIS FILE IS AT SOME POINT
// OR ANOTHER CALLED BY THIS FILE...SHIT STARTS HERE!

var express         = require('express');
var session         = require('express-session');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var logger          = require('morgan');

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

// here we configure express to use cookie-parser middleware for extracting the data from cookies
server.use(cookieParser());

