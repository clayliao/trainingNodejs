function start() {
    console.log("Request handler 'start' was called.");
}

function upload() {
    console.log("Request handler 'upload' was called.");
}

function api() {
    
    var request = require('request'); 
    
    options = {
        'method' : 'GET',
            'uri' :  'http://api.getclicky.com/api/stats/4?site_id=32020&sitekey=2e05fe2778b6&type=countries&output=json',
        'body' : '',
        'headers' : {
            'content-type' : 'application/x-www-form-urlencoded'
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log('body', body)             
            data = JSON.parse(body);

        
        } else {
            console.log('body', body);
        }
    })
}

function api2() {
    "use strict";
    
    var http = require("http"),
    options = {
        host: 'http://api.getclicky.com',
        port: 80,
        path: '/api/stats/4?site_id=32020&sitekey=2e05fe2778b6&type=countries',
        method: 'GET'
    };

    var req = http.request(options, function(res) {
    
        var data = "";
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            data = data + chunk;
        });

        res.on('end', function(){
            data = JSON.parse(data);
            if(data.result.count > 0){
                var que = data.result.question,
                len = que.length,i;

                for(i = 0 ; i < len; i += 1) {
                    response.write("<h3>" + que[i].title + "</h3>");
                }
            } else {
                response.write("<h3>No Result !!</h3>");
            }
            response.write("</body>");
            response.write("</html>");
            response.end();
        });

    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.end();
}

exports.api = api;
exports.start = start;
exports.upload = upload;