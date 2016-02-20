var express = require('express');
var router = express.Router();
var auth = require('../database/auth');

router.post('/login', auth.login);

router.get('/logout', auth.logout);

router.post('/signup', auth.signup);

module.exports = router;
