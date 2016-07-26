/*global require, exports, console*/
var path = require("path");

function p_route(handle, http_response, pathname, tail) {
    pathname = path.normalize(pathname);

    var dir = path.dirname(pathname);
    var base = path.basename(pathname, '\\' );

	if (typeof handle[base] === 'function') {
		console.log("request found for " + base);
		handle[base](http_response, tail);
	} else if ( dir == '\\' ) {
		handle.start(http_response);
		//console.log("No request handler found for " + pathname + tail );
	} else {
        p_route(handle, http_response, dir, "\\" + base + tail);
    }
}

function route(handle, http_response, pathname) {
	console.log("About to route a request for " + pathname);
    p_route(handle,http_response,pathname,"");
}

exports.route = route;
