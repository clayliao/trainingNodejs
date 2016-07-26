"use strict";

var _http = require('../lib/http');
var ydict = require('../lib/ydict');

function ping(request, responseWriter) {
	responseWriter.writeEnd("<h1>pong</h1>", 404);
}
function send(request, responseWriter) {
	responseWriter.writeEnd("got it");
}
function query(request, responseWriter) {
	var queryMap = _http.getQueryMap(request.url);
	if (typeof queryMap.q === 'undefined') {
		responseWriter.writeEnd('query by parameter, q');
	} else {
		ydict.lookup(queryMap.q, responseWriter);
	}
}

exports.ping = ping;
exports.send = send;
exports.query = query;
