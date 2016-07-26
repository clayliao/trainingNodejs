var http = require("http");

function evi(resp, query) {
    "use strict";

    console.log("Request handler 'evi' was called.");
    var parseEvi = function (content) {
        var regex = /<tk:text_result>(.*?)<\/tk:text_result>/,
        txt = content.match(regex);
        if (txt === null) {
            return false;
        }
        return txt[1];
    },
    fs = require('fs'),
    http = require("http"),
    q = encodeURI(query.query),  //q = "birthday of obama"
    url = 'api_account_id=api_yahoous&api_password=Eab5cFikzwGnrDmW&object_metadata=image&question_entities=0&input=' + q,
    options = {
        host: 'api.us.evi.com',
        port: 80,
        path: '/direct_answer/?' + url,
        method: 'GET'
    },
    req = http.request(options, function(res) {
        var data = "";
        console.log('get response: ' + res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            var answer = parseEvi(data.toString());
            if (answer !== false) {
                resp.write("Answer: <b>" + answer.toString() + "</b>");
            } else {
                resp.write("Cannot find the answer");
            }
            resp.write('</body></html>');
            resp.end();
        });
    }).on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.end();
}

exports.evi = evi;
