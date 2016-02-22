var express     = require('express');
var router      = express.Router();
var client      = require('../client');

router.get('/', client.logout);

module.exports = router;
