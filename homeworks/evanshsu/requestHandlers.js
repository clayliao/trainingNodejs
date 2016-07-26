"use strict";

var http = require("http");
var url = require("url");

function index(request, response) {
	console.log("Request handler 'index' was called.");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<form action='./query'>BattleTag: <input name='q' value='fattom-1548' /></form>");
	response.end();
}

function query(request, response) {
	var q = url.parse(request.url, true).query.q;

	response.writeHead(200, {"Content-Type": "application/json"});

	console.log("Request handler 'query' was called.");

	http.get({host: 'tw.battle.net', port: 80, path: '/api/d3/profile/' + q + '/', agent: false}, function (res) {
		res.on('data', function (chunk) {
			response.write(chunk);
			console.log('BODY: ' + chunk);
		});
		res.on('end', function () {
			response.end();
		});
	});
}

exports.index = index;
exports.query = query;
