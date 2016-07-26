var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    console.log("Request received.");
    var pathname = url.parse(request.url).pathname;
    var params = url.parse(request.url, true).query;
    console.log("Request for " + pathname + " received.");

    
    route(handle, pathname, request, response, params );

    
    //response.write(pathname);
    //console.log("*************************************");
    //console.log(ret);
    //response.write(ret.toString());
    //console.log("*************************************");
    
    console.log("end responding");
    
    
  }
  http.createServer(onRequest).listen(8888);

  console.log("Server has started.");
}

exports.start = start;
