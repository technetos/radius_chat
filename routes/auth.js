var express = require('express');
var router = express.Router();
var auth = require('../database/session');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.post('/login', jsonParser, auth.login);

router.get('/logout', auth.logout);

router.post('/signup', jsonParser, auth.signup);

module.exports = router;
