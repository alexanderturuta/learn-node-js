var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', require('./../middleware/checkAuth'), function(req, res, next) {
    res.render('chat');
});

module.exports = router;
