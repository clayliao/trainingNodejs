/*global process, require, console,  __dirname:false, __dirname:false*/
/**
 * Module dependencies.
 */
var express = require('express'), 
routes = require('./routes'), 
http = require('http'), 
path = require('path');

var app = express();

app.configure(function(){
    app.set('port', 1874);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'mustache');
    app.engine("mustache", require('hbs').__express);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    //app.use(express.bodyParser());
    app.use(express.bodyParser({ keepExtensions: true}));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express['static'](path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/', routes.upload, routes.index);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
