//require
var express = require('express');
var server = express();

var hbs = require('express-handlebars');
var bodyParser = require('body-parser')

var routes = require('./routes/app.js');

//engine
engines = require ('consolidate');

//html egine
//server.set('view engine', 'hbs');
//server.set('views', __dirname + '/views');/
//server.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/'}));

server.set('view engine', 'html');
server.set('views', __dirname );
server.engine('html', engines.hogan);

//using server
server.use(bodyParser());

server.use('/', routes);


// catch 404 and forward to error handler
server.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
// error handlers

// development error handler
// will print stacktrace
if (server.get('env') === 'development') {
server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
    message: err.message,
    error: err
    });
});
}
  
// production error handler
// no stacktraces leaked to user
server.use(function(err, req, res, next) {
res.status(err.status || 500);
res.render('error', {
    message: err.message,
    error: {}
});
});

server.listen(8080, function(){
    console.log('Express server listening on port 8080');
});

module.exports = server;
