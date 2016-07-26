var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    console.log("Request received.");
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    //response.writeHead(200, {"Content-Type": "text/plain"});
    route(handle, pathname, response);

  }
  http.createServer(onRequest).listen(12345);

  console.log("Server has started.");
}

exports.start = start;
