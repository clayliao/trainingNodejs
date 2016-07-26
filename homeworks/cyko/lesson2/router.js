var url = require('url');
var qs = require('querystring');

function getPathName(request) {
	return url.parse(request.url).pathname;
}

function getParams(request) {
	return qs.parse(url.parse(request.url).query);
}

function route(request, handler, response) {
	var pathname = getPathName(request);
	var params = getParams(request);

	console.log("About to route a request for " + pathname);
	if (undefined === handler[pathname]) {
		console.log('Path '+pathname+' not defined');
		handler["/default"](pathname, response);
	}
	else {
		handler[pathname](params, response);
	}
}

exports.route = route;
