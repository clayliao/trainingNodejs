var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.evi;
handle["/evi"] = requestHandlers.evi;

server.start(router.route, handle);
