//require
var express = require('express');
var server = express();

var bodyParser = require('body-parser')

var routes = require('./routes/app.js');

//engine
engines = require ('consolidate');


server.set('view engine', 'html');
server.set('views', __dirname );
server.engine('html', engines.hogan);

//using server
server.use(bodyParser());
server.use('/', routes);


server.listen(8080, function(){
    console.log('Express server listening on port 8080');
});

module.exports = server;
