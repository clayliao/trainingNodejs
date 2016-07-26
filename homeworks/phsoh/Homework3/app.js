
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , msgAdd = require('./routes/msgAdd')
  , cons = require('consolidate')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.engine('html', cons.swig);
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(express.favicon(__dirname + '/public/images/favicon.ico', { maxAge: 2592000000 }));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/msg/add', msgAdd.msgAdd);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
