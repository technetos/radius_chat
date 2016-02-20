var express = require('express');
var router = express.Router();
var auth = require('../database/session');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.get('/', jsonParser, function (req, res, next) {
	res.json(req.session.user.toObject());
});

module.exports = router;
