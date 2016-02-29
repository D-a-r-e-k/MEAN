var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
var auth = require('./auth');

var app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
 
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

auth.init(app);
routes.init(app);

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: "We are still under construction. Try after few minutes.",
        error: {}
    });
});

var port = process.env.PORT || 3000;
app.listen(port);

