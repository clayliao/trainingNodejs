var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle;
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/news'] = requestHandlers.news;
handle.error = requestHandlers.error;

server.start(router.route, handle);
