var express     = require('express');
var router      = express.Router();
var session     = require('../session');
var bodyParser  = require('body-parser');
var jsonParser  = bodyParser.json();

router.post('/', jsonParser, session.signup);

module.exports = router;
