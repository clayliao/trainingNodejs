"use strict";
var http = require("http");
var url = require("url");

function start(config, dispatcher) {
    function onRequest(request, response) {
        var parsedUrl, pathname, viewPath, context = [];
        parsedUrl = url.parse(request.url, true);
        pathname = parsedUrl.pathname;
        context.query = parsedUrl.query;
        if (pathname === '/') {
            pathname = config.getDefaultController();
        }
        viewPath = dispatcher.invokeController(pathname, request, response, context, function () {
            dispatcher.renderView(viewPath, request, response, context);
        });
    }

    http.createServer(onRequest).listen(config.getPort());
    console.log("Server is running at http://" + config.getHostname() + ":" + config.getPort());
}

exports.start = start;