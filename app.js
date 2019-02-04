var express = require('express');

var cfenv = require('cfenv');
var bodyParser = require('body-parser');
var path = require('path');
var util = require('util');

var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(express.static('static'))

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', function(req, res) {
    res.render('main5.ejs');
});

app.get('/popup1', function(req, res) {
    res.render('popup1.ejs');
});

app.get('/popup2', function(req, res) {
    res.render('popup2.ejs');
});

app.get('/.well-known/pki-validation/34CF20AEF7885A46FDF9757BA65C5608.txt', function(req, res) {
    res.sendFile("./well-known/pki-validation/34CF20AEF7885A46FDF9757BA65C5608.txt");
});



// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});
