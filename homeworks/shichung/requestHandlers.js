var http = require("http");

function search(response) {
    console.log("Request handler 'search' was called.");

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hi, Search");

    //* @see http://ws2.ks.tp2.yahoo.com/oa_test/oa_search_qa_keyword.php?keyword=dvd&scope=content&exclude=&state=0&catid=&time=0&prate=0&start=0&count=10&intl=tw&sort=1&format=xml&callback=
    //* @see http://q1-vm7.ks.tp2.yahoo.com:4080/v3/search_qa/keyword/dvd?format=xml&appid=12345&callback=&&scope=content&exclude=&state=0&catid=&time=0&prate=0&start=0&count=10&intl=tw&sort=1
    //* @see http://q1-vm7.ks.tp2.yahoo.com:4080/v3/search_qa/keyword/dvd?format=json&appid=12345&callback=&&scope=content&exclude=&state=0&catid=&time=0&prate=0&start=0&count=10&intl=tw&sort=1
    var options = {
        host: 'q1-vm7.ks.tp2.yahoo.com',
        port: 4080,
        path: '/v3/search_qa/keyword/dvd?format=json&appid=12345&callback=&&scope=content&exclude=&state=0&catid=&time=0&prate=0&start=0&count=10&intl=tw&sort=1',
        method: 'GET'
    };

    var body = '';
    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            response.write(body);
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write('data\n');
    req.write('data\n');
    req.end();

    response.write('End');
    response.end();
}

function getqack(response) {
    console.log("Request handler 'getqack' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hi, GetQack");
    response.end();
}

exports.search = search;
exports.getqack = getqack;
