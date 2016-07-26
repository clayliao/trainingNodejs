"use strict";

var localPage = require("./localPage");

function show(response) {
    var head = localPage.generateLocalHead(),
        body = localPage.generateLocalSearchForm();
    response.write('<html><head>' + head + '</head><body>' + body + '</body></html>');
    response.end();
}

exports.show = show;
