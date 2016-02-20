// this route needs to handle verification of credentials
// and the load/store of current user sessions

var express     = require('express');
var router      = express.Router();
var session     = require('../session');
var bodyParser  = require('body-parser');
var jsonParser  = bodyParser.json();

router.post('/', jsonParser, session.login);

module.exports = router;
