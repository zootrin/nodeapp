var express = require('express');
var app = express();


// serve static files from /public

app.use(express.static(__dirname + '/template'));


// include routes

var routes = require('./routes/router');

app.use('/', routes);


// catch 404 and forward to error handler


app.use(function(req, res, next) {


    var err = new Error('File Not Found');

    err.status = 404;

    next(err);

});


// error handler

// define as the last app.use callback

app.use(function(err, req, res, next) {


    res.status(err.status || 500);


    res.json('error', {

        message: err.message,

        error: {}

   });

});


// listen on port 8080



app.listen(8080, function () {



    console.log('Express app listening on port 8080');

});