var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle[''] = requestHandlers.start;
handle['start'] = requestHandlers.start;
handle['upload'] = requestHandlers.upload;
handle['where'] = requestHandlers.where;
handle['mysql'] = requestHandlers.mysql;

server.start(router.route, handle);
