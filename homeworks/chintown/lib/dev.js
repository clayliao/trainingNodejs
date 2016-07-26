"use strict";

var util = require('util');

var de = function () {
	var i;
	for (i = 0; i < arguments.length; i++) {
		console.log(arguments[i]);
	}
};

var varExport = function (variable) {
	return util.inspect(variable);
};

exports.de = de;
exports.varExport = varExport;