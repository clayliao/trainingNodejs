"use strict";
var localPage = require("./localPage");

function show(response, queries) {
    var head = localPage.generateLocalHead(),
        body = localPage.generateLocalSearchForm(queries.p, queries.addr);

    if (queries && queries.p && queries.addr) {
        response.write('<html><head>' + head + '</head><body>' + body + '<hr />');
        localPage.triggerLocalSearchResult(response, queries);
    } else {
        response.write('<html><head>' + head + '</head><body>' + body + '</body></html>');
        response.end();
    }
}

exports.show = show;
