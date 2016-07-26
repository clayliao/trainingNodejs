"use strict";

var url = require('url');
var _http = require('./lib/http');
var cts_base = require('./controllers/base');
var cts_hw2 = require('./controllers/homework2');

var routeTable = {
	'start': cts_hw2.ping,
	'upload': cts_hw2.send,
	'query': cts_hw2.query,
	'sleep': cts_base.sleep,
	'on404': cts_base.on404
};

function isValidPath(pathName, routeTable) {
	return (typeof routeTable[pathName] === 'function');
}

var getController = function (requestUrl) {
	var controller,
		urlParts = url.parse(requestUrl),
		pathName = urlParts.pathname.replace(/^\//, '');

	if (pathName === '') {
		// default
		controller = routeTable.start;
	} else if (isValidPath(pathName, routeTable)) {
		// lookup routing table
		controller = routeTable[pathName];
	} else {
		// invalid
		controller = routeTable.on404;
	}
	return _http.decorate(controller);
};

exports.getController = getController;
