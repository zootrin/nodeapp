var express = require('express');
var router = express.Router();
var User = require('./models/user');


// GET route for reading data
router.get('/profile', function(req, res, next) {
    return res.send("GET profile");
});


module.exports = router;