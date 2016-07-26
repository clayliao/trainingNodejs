var http = require("http");
var url = require("url");
var querystring = require("querystring");

function start(evi, handle) {
	"use strict";

	function onRequest(request, response) {
		//get query from url query=xxx
		var query = querystring.parse(url.parse(request.url).query);
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write('<html><title>Homework2</title><body>');
		response.write("<h2>Welcome to EVI - Question and Answering System</h2>");
		response.write("Question: " + query.query + "<br>");
		evi(response, query);
	}

	http.createServer(onRequest).listen(8888);

	console.log("Server has started");
}

exports.start = start;
