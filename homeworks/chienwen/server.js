"use strict";

var http = require("http");
var url = require("url");

var config = require("./config");
var log = require("./log");

function start(route, handle) {
    function onRequest(request, response) {
        var parsed = url.parse(request.url);
        log.info("Receive request " + parsed.pathname + " from " + request.client.remoteAddress);

        route(handle, parsed, response);

    }
    http.createServer(onRequest).listen(config.port);
    log.info("Server started at port " + config.port);
}

exports.start = start;
