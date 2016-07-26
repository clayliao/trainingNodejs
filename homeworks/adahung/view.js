"use strict";

function view(response, content) {
    console.log("output the content");
    response.writeHead(200, {"Content-Type": "text/xml"});
    response.write(content);
    response.end();
}

function error(response, errorStr) {
    console.log('output error');
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write(errorStr);
    response.end();
}

exports.view = view;
exports.error = error;