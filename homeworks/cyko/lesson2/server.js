var http = require("http");

function start(route, handle) {
	function onRequest(request, response) {
		route(request, handle, response);
	}

	http.createServer(onRequest).listen(8888);

	console.log("Server has started.");
}

exports.start = start;
