var http = require("http");
var url = require("url");
var querystring = require("querystring");

function start(route, handle) {
    function onRequest(request, response) {

        var pathname, query, params;

        pathname = url.parse(request.url).pathname;
        query = url.parse(request.url).query;
        params = querystring.parse(query);

        console.log("Request for " + pathname + " received.");
        console.log("Querystring '" + query + "' received.");
        console.log(params);

        //response.writeHead(200, {"Content-Type": "text/plain"});

        route(pathname, params, handle, response);

        //response.write("Hello World");
        //response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;

