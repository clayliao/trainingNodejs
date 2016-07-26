var sql = require("./mysqlHandlers.js");

function start(params, response) {
    console.log("Request handler 'start' was called.");
    response.write('START -- Hello World');
    response.end();
}

function upload(params, response) {
    console.log("Request handler 'upload' was called.");
    response.write('UPLOAD');
    response.end();
}

function search(params, response) {
    console.log("Request handler 'search' was called.");

    response.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});

    response.write('<head>');
    response.write('<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.7.3/build/cssreset/cssreset-min.css">');
    response.write('</head>');

    sql.getRecords(response);

    var http, options, req, p, c, body;

    http = require("http");
    p = (typeof (params.p) !== 'undefined' && params.p !== '') ? params.p : 'obama';
    c = (typeof (params.c) !== 'undefined' && params.c !== '') ? params.c : '5';

    // BOSS API: http://gw01.bossgw-stag.search.sk1.yahoo.com:4080/ysearch/web?debug=true&format=xml&market=en-us&mkt=US&q=yahoo&count=5
    options = {
        host: 'gw01.bossgw-stag.search.sk1.yahoo.com',
        port: 4080,
        path: '/ysearch/web?format=json&q=' + encodeURI(p) + '&count=' + c,
        method: 'GET'
    };

    body = "";
    req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            // console.log('BODY: ' + chunk);
            body += chunk;
        });

        res.on('end', function () {
            var algo, total, results, i;
            algo = JSON.parse(body);
            total = algo.bossresponse.web.count;
            results = algo.bossresponse.web.results;

            for (i = 0; i < total; i++) {
                response.write('<h3><a href="' + results[i].clickurl + '">' + results[i].title + '</a></h3>');
                response.write('<div>' + results[i].abstract + '</div>');
                response.write('<span style="color:green;">' + results[i].dispurl + '</span>');
                response.write('<hr>');
            }

            sql.insertRecord(p);
            response.end();
        });

    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();

}

exports.start = start;
exports.upload = upload;
exports.search = search;
