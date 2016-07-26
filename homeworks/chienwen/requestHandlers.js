"use strict";

var querystring = require('querystring');
var log = require("./log");
var srpPage = require("./localSRP");
var sfpPage = require("./localSFP");

function sfp(parsedURL, response) {
    log.info("Request handler 'sfp' was called.");
    response.writeHead(200, {"Content-Type": "text/html"});
    sfpPage.show(response);
}

function srp(parsedURL, response) {
    log.info("Request handler 'srp' was called.");
    response.writeHead(200, {"Content-Type": "text/html"});
    srpPage.show(response, querystring.parse(parsedURL.query));
}

exports.sfp = sfp;
exports.srp = srp;
