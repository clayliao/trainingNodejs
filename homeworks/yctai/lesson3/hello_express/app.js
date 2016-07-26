
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , upload = require('./routes/upload')
  , guestbook = require('./routes/guestbook')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'mustache');
  app.use(express.favicon());
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
app.get('/image/*', routes.image);
app.get('/record', routes.record);
app.get('/guestbook', guestbook.guestbook);
app.post('/upload', upload.upload);
console.log(app.routes);
console.log(upload);
console.log(guestbook);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var engines = require('consolidate');
app.engine('mustache', engines.mustache);

