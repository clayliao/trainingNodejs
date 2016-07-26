var url = require("url");
var util = require("util");
var models = require("./models");

function start(request, response) {
    console.log("Request Handler 'start' was called");
}
function upload(request, response) {
    console.log("Request Handler 'upload' was called");
}
function getBookmarks(request, response) {
    var query = url.parse(request.url, true).query.p;
    
    console.log("Request Handler 'getBookmarks' was called");
    
    response.writeHead(200, {"Content-Type": "text/html"});
    if (query) {
        response.write('<html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"></head>');
        response.write('<body><h2>Recent 10 Bookmarks Tagged "' + query + '"</h2>');
        models.requestDelicious(query, function(data){
            var i;
            if (data && util.isArray(data)) {
                response.write('<ol>');
                for (i=0;i<data.length;i++) {
                    response.write('<li>');
                    response.write('<a href="' + data[i].u + '">' + data[i].d + '</a>');
                    response.write("</li>");
                }
                response.write('</ol>');
            } else {
                response.write('Error!');
            }
            response.write('</body></html>');
            response.end();
        });
    } else {
        response.write('Emprty query!');
        response.end();
    }
}

exports.start = start;
exports.upload = upload;
exports.getBookmarks = getBookmarks;