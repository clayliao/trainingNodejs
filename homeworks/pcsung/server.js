var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Request for ' + pathname + ' Received');
        route(handle, pathname, request, response);
    }
    http.createServer(onRequest).listen(8888);
    console.log('Server running at http://localhost:8888/');
}

exports.start = start;
