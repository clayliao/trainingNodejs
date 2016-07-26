
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    guest = require('./routes/guest'),
    http = require('http'),
    path = require('path');

var engines = require('consolidate');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 8888);
    app.set('views', __dirname + '/views');
    app.engine('mustache', engines.mustache);
    app.set('view engine', 'mustache');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/guest', guest.get);
app.post('/guest', guest.post);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
