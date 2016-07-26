var http = require("http");
var url = require("url");
var querystring = require("querystring");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        var query = querystring.parse(url.parse(request.url).query);

        console.log("Request for " + pathname + " received from " + request.connection.remoteAddress);

        response.writeHead(200, {"Content-Type": "text/html"});
        response.write('<html><title>Homework for lesson 2</title><body>');
        response.write("<h2>Welcome to EVI - Question and Answering System</h2>");
        response.write("<small>我不會寫所以抄 Ange 的...</small><br />");
        route(handle, pathname, response, query);
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server running at http://localhost:8888/");
}

exports.start = start;
