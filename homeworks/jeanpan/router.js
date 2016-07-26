function route(handle, pathname, query, response) {
	'use strict';
	console.log("About to route a request for " + pathname);

	if (typeof handle[pathname] === 'function') {
		handle[pathname](query, response);
	} else {
		console.log("No request handler found for " + pathname);
	}
}

exports.route = route;
