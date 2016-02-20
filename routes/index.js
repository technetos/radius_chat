var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json('you have reached the index');
});

module.exports = router;
