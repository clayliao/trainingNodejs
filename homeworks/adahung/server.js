"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");

function start(route, handle) {
    function onRequest(request, response) {
        console.log("Request received.");
        var pathname, qstring;
        pathname = url.parse(request.url).pathname;
        qstring = url.parse(request.url).query;
        console.log("Request for " + pathname + " received.");
        console.log("querystring: ", url.parse(request.url));

        route(handle, pathname, querystring.parse(qstring), response);
    }
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
}

exports.start = start;
