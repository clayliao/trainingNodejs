function route(handle, pathname, req, res, param) {
	console.log("About to route a request for " + pathname);
    
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](req, res, param);
	} else {
		console.log("No request handler found for " + pathname);
	}
}

exports.route = route;
