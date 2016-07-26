var http = require("http");
var url = require("url");
var querystring = require("querystring");

function start(route, handle) {
  'use strict';

  function onRequest(request, response) {

    var pathname = url.parse(request.url).pathname, 
        query = querystring.parse(url.parse(request.url).query);

    //console.log("Request for " + pathname + " received.");
    
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

    response.write("<html><title>nodejs_hw2 (Jean)</title>");
    response.write("<body>");
    
    route(handle, pathname, query, response);

    //response.end();
  }

  http.createServer(onRequest).listen(8888);

  console.log("Server Starting ...");
}

exports.start = start;