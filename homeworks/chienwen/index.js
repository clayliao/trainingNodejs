var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle['/'] = requestHandlers.sfp;
handle['/sfp'] = requestHandlers.sfp;
handle['/srp'] = requestHandlers.srp;

server.start(router.route, handle);
