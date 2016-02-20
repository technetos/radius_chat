var express     = require('express');
var router      = express.Router();
var session     = require('../session');

router.get('/', session.logout);

module.exports = router;
