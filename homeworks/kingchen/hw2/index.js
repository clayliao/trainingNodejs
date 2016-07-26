/*global require, exports, console*/

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle.start = requestHandlers.start;
handle.tvtime = requestHandlers.tvtime;
handle.music = requestHandlers.music;

server.start(router.route, handle);
