// Author: Winnie Yang

var http = require("http");

http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
    console.log("Server is on @8888 port");
}).listen(8888);
