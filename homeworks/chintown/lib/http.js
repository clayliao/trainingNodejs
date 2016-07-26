"use strict";

var url = require('url');
var querystring = require('querystring');

var template = require('./ejohn_template');

function getQueryMap(urlStr) {
	return querystring.parse(url.parse(urlStr).query);
}

function getResponseWriter(response) {
	return {
		'writeEnd': function (content, statusCode) {
			statusCode = statusCode || 200;
			response.writeHead(statusCode, {"Content-Type": "text/html; charset=utf-8"});
			response.write(content);
			response.end();
		},
		'writeTemplate': function (templateName, object, statusCode) {
			template.render(templateName, object, this.writeEnd);
			console.log('[INFO] handling "' + object.query + '" ... end');
		},
		'getResponse': function () {
			return response;
		}
	};
}

function preHook(request, response) {
	return {
		'request': request,
		'response': getResponseWriter(response)
	};
}

function decorate(controller) {
	return function (request, response) {
		var decoratedPair = preHook(request, response);
		controller(decoratedPair.request, decoratedPair.response);
	};
}

exports.getQueryMap = getQueryMap;
exports.decorate = decorate;