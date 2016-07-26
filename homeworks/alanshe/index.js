"use strict";
var os = require("os");
var server = require("./server");
var dispatcher = require("./dispatcher");

var myConfig = (function () {
    var port = 8888,
        defaultController = '/home';
    return {
        getPort : function () {
            return port;
        },
        getHostname : function () {
            return os.hostname();
        },
        getDefaultController : function () {
            return defaultController;
        }
    };
}());

server.start(myConfig, dispatcher);