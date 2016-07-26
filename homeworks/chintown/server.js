"use strict";

var http = require("http");
var router = require("./router");

var server,
	port = 8888;
var onRequest = function (request, response) {
	(router.getController(request.url))(request, response);
};

server = http.createServer(onRequest);
server.listen(port);
console.log('running on port:' + port);