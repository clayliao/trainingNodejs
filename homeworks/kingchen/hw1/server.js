var http = require("http");

http.createServer( function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}).listen(8889);

console.log("Server is running at port 8888");