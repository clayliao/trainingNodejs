"use strict";

function route(handle, pathname, querystring, response) {
	console.log("About to route a request for " + pathname);

	if (typeof handle[pathname] === 'function') {
		handle[pathname](querystring, response);
	} else {
		console.log("No request handler found for " + pathname);
		handle.error(response, 'nonono!');
	}
}

exports.route = route;
