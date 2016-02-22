var express     = require('express');
var router      = express.Router();
var client      = require('../client');
var bodyParser  = require('body-parser');
var jsonParser  = bodyParser.json();

router.post('/', jsonParser, client.signup);

module.exports = router;
