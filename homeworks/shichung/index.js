var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle['/'] = requestHandlers.search;
handle['/search'] = requestHandlers.search;
handle['/getqack'] = requestHandlers.getqack;

server.start(router.route, handle);
