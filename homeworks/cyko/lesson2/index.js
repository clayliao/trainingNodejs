var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/query"] = requestHandlers.queryHandler;
handle["/default"] = requestHandlers.defaultHandler;

server.start(router.route, handle);
