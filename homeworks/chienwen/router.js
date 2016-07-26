"use strict";

var fs = require("fs");
var log = require("./log");
var config = require("./config");

function route(handle, parsedURL, response) {

    if (typeof handle[parsedURL.pathname] === 'function') {
        handle[parsedURL.pathname](parsedURL, response);
    } else if (parsedURL.pathname === "/favicon.ico") {
        log.info("Send favicon.");
        var img = fs.readFileSync(config.faviconImgPath);
        response.writeHead(200, {'Content-Type': 'image/png' });
        response.write(img, 'binary');
        response.end();
    } else {
        log.warn("No request handler found for " + parsedURL.pathname);
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write('Not Found. <a href="/">Back to front page.</a>');
        response.end();
    }
}

exports.route = route;
