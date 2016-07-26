/*global require, exports, console*/

var http = require("http");

/* http_simple_reqest: 
 * options: http://nodejs.org/api/http.html#http_http_request_options_callback 
 * parse: a callback function which takes one parameter(string)
          the parse action will be emitted when the simpe http request is final
 * 
 * nothing return
 */
function http_simple_request(options, parse) {

    var response_handler = function (){
        var result =""; 
        return {
            add_data: function(data){
                result = result + data; 
            },
            end: function(){
                parse(result);
            }
        };
    }();

    var request = http.request(options, function(response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');
        
        //data
        response.on('data', function (chunk) {
            console.log('call data');
            response_handler.add_data(chunk);
        });

        //end
        response.on('end', function () {
            console.log('call end');
            response_handler.end();
        });
    });

    request.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    request.end();
}

exports.http_simple_request = http_simple_request;
