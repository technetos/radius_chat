// this route needs to handle verification of credentials
// and the load/store of current user sessions

var express     = require('express');
var router      = express.Router();
var client      = require('../client');
var bodyParser  = require('body-parser');
var jsonParser  = bodyParser.json();

router.post('/', jsonParser, client.login);

module.exports = router;
