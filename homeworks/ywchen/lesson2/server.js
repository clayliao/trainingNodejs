"use strict";

var http = require('http');
var port = 8888;

function start() {
    function onRequest(serverReq, serverRes) {
        function onBackendReturns(clientRes) {
            clientRes.on("data", function (data) {
                if (clientRes.statusCode === 200) {
                    serverRes.write(String(data));
                } else {
                    serverRes.writeHead(500, "Client status: " + clientRes.statusCode);
                }
            });
            clientRes.on("end", function () {
                serverRes.end();
            });
        }
        function onRequestErrors(err) {
            console.log('problem with request: ' + err.message);
            serverRes.writeHead(500, "problem with request: " + err.message);
            serverRes.end();
        }
        var req = http.request(
            { host: "sc1.vertical.search.vip.tw1.yahoo.com", port: 4080, path: "tiled?vertical=news&query=obama&hits=10&offset=0&intl=tw&resulttypes=article", method: "GET" },
            onBackendReturns
        );
        console.log("access: " + serverReq.url);
        req.on('error', onRequestErrors);
        req.end();
    }

    http.createServer(onRequest).listen(port);
}

exports.start = start;
