"use strict";
var http = require("http");

var option = (function () {
    var host = 'us.battle.net',
        port = '80',
        path = '/api/d3/profile/';
    return {
        getHost : function () {
            return host;
        },
        getPort : function () {
            return port;
        },
        getPath : function () {
            return path;
        }
    };
}());

function run(request, response, context, render) {
    var httpOption = {
        host : option.getHost(),
        port : option.getPort(),
        path : option.getPath() + context.query.battletag + '/'
    };

    http.get(httpOption, function (res) {
        var content = '';
        res.on("data", function (chunk) {
            content += chunk;
        });
        res.on("end", function () {
            context.profile = JSON.parse(content);
            console.log(context.profile);
            render("heroView");
        });
    }).on("error", function (e) {
        console.log("Error on sending HTTP request");
    });
}

exports.run = run;