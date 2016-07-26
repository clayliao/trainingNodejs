var http = require("http");

function requestDelicious(query, callback) {
    var options, req;
    options = {
        host: 'feeds.delicious.com',
        port: 80,
        path: '/v2/json/tag/'+query,
        method: 'GET'
    };

    req = http.request(options, function(res) {
        var jsonData = '';
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Received data: ' + chunk);
            jsonData += chunk;
        });
        res.on('end', function () {
            callback(JSON.parse(jsonData));
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        callback();
    });

    req.end();
}

exports.requestDelicious = requestDelicious;