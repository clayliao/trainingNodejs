function start() {
    console.log("Request handler 'start' was called.");
}

function upload() {
    console.log("Request handler 'upload' was called.");
}

function flickr( f_req, f_res, params){
    
    var http = require('http');
    var options = {
      host: 'www.flickr.com',
      port: 80,
      path: '/services/rest/?method=flickr.test.echo&format=rest&message='+params.message+'&api_key=d9e0020f3ea725b1e5e977bb0ac491c6',
      method: 'POST'
    };
    
    f_res.writeHead(200, {"Content-Type": "text/plain"});
    
    // returns an instance of the http.ClientRequest class
    var req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      res.setEncoding('utf8');
    });
    
    req.on('response', function(response) {
        response.on('data', function (chunk) {
            console.log("++++++++++++++++++++++++++++++");
            console.log('BODY: ');
            console.log(chunk);
            f_res.write(chunk);// seems no use here...
            console.log("++++++++++++++++++++++++++++++");
            f_res.end();
        });
    });
    
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    req.end();
    //f_res.write("flickr api");
    //
    //return req.output;
}

exports.start = start;
exports.upload = upload;
exports.flickr = flickr;