"use strict";

var mysql = require('mysql');
var conf = require('../conf/mysql').conf;

var insertOnce = function (result) {
	var sql,
		link;
	sql = 'INSERT INTO db SET result = "' + result + '"';

	link = mysql.createClient(conf);
	link.query(sql, function selectCb(err, results, fields) {
		if (err) {
			throw err;
		} else {
			console.log('[INFO] DB updated!');
		}
		link.end();
	});
};

exports.insertOnce = insertOnce;