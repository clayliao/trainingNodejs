"use strict";

function route(handle, pathname, request, response) {
	if (handle[pathname]) {
		handle[pathname](request, response);
		console.log("About to route a request for " + pathname);
	} else {
		console.log("Not allow to request for " + pathname);
	}
}

exports.route = route;
