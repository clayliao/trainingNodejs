"use strict";

var view = require('./view');
var http = require('http');

function start(querystring, response) {
    console.log("Request handler 'start' was called.");
    view.view(response, '<a>test</a>');
}

function upload(querystring, response) {
    console.log("Request handler 'upload' was called.");
}

function news(querystring, response) {
    var category, opts, req;
    category = querystring.category;
    opts = {
        'host': 'tw.news.yahoo.com',
        'path': '/rss/' + category
    };
    req = http.get(opts, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            console.log("Get all Body!");
            if (res.statusCode === 200) {
                view.view(response, data);
            } else {
                view.error(response, 'undefined category ' + category);
            }
        });
    });
    req.end();
}

function error(response, errStr) {
    view.error(response, errStr);
}

exports.start = start;
exports.upload = upload;
exports.news = news;
exports.error = error;
