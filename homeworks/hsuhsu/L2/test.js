var http = require('http');

var options = {
  host: 'www.flickr.com',
  port: 80,
  path: '/services/rest/',
  //path: 'method=flickr.test.echo&format=rest&foo=QQ&api_key=fdae1b627798319d7f9770f3efb04f64',
  method: 'POST'
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();