
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , cons = require('consolidate')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = express();

app.configure(function(){
  'use strict';

  app.engine('html', cons.swig);
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

});

app.configure('development', function(){
  'use strict';

  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.post('/send', routes.send);

app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  'use strict';

  console.log("Express server listening on port " + app.get('port'));
});
