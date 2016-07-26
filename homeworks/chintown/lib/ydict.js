"use strict";

var http = require('http');
var de = require('./dev').de;
var db = require('./mysql');

var option = {
	'host': 'tw.dictionary.yahoo.com',
	'port': 80,
	'path': '/dictionary?p='
};

function parseDescs(str) {
	var ptn, m, descs = [], i, count;
	//ptn = /<div class="description">[^\P{C}]*?<\/div>/gi';
	ptn = /<p class="interpret">[^\P{C}]*?<\/p>/gi;

	m = str.match(ptn);
	count = (m !== null) ? m.length : 0;
	for (i = 0; i < count; i++) {
		descs.push(m[i].replace(/<[^\P{C}]*?>/g, ''));
	}
	return descs;
}
function renderDefinitions(query, definitions) {
	var i,
		defs = [];
	for (i = 0; i < definitions.length; i++) {
		defs.push('<dd>' + definitions[i] + '</dd>');
	}
	return '<dl>' + '<dt>' + query + '</dt>' + defs.join('') + '</dl>';
}

var onError = function (error) {
	console.log('[ERROR] ' + error.message);
};

function lookup(query, responseWriter) {
	console.log('[INFO] handling "' + query + '" ... start');
	var opt = {
			'host': option.host,
			'port': option.port,
			'path': option.path + encodeURI(query)
		},
		request;

	request = http.get(opt, function (ydictResponse) {
		var str = '';
		ydictResponse.on('data', function (chunk) {
			str += chunk;
		});
		ydictResponse.on('end', function () {
			var descs = parseDescs(str);

			if (descs.length === 0) {
				responseWriter.writeEnd('not found', 404);
			} else {
				//responseWriter.writeEnd(renderDefinitions(query, descs));
				responseWriter.writeTemplate('query.html', {'query': query, 'descs': descs});
				// for (var i = 0; i < descs.length; i++) {
				//     db.insertOnce(descs[i]);
				// };
			}
		});
	});
	request.on('error', onError);
	request.end();
}

exports.lookup = lookup;