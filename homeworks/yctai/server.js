var http = require("http");

http.createServer( function(request, resp) {
    console.log(request);
    resp.writeHead( 200, {"Content-Type" : "text/plain"} );
    resp.write("Heeeelllo NodeJSSSS World");
    resp.end();
}).listen(18181);
