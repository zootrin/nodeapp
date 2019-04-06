var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore= require('connect-mongo')('session');

// connect to MongoDb
mongoose.connect('mongodb://localhost/testForAuth');
var db = mongoose.connection;

// handle MongoDB errors
db.on('error', console.error.bing(console, 'connection error:'));
db.once('open', function(){

});

//use session for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//parsing incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// serve static files from /public
app.use(express.static(__dirname + '/templateLogReg'));


// include routes

var routes = require('./router.js');
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


    res.send(err.message);

});


// listen on port 8080

app.listen(8080, function () {


    console.log('Express app listening on port 8080');

});