/*global require, exports, console, JSON*/

function start(http_response) {
    http_response.writeHead(200, {"Content-Type": "text/plain"});
    http_response.write( "This is the default page" );

    console.log("Request handler 'start' was called.");
    http_response.end();
}

function music_release_popular(http_response){
    console.log("Request handler 'music' was called");    

    var options = {
        host: 'yql.yahooapis.com',
        port: 80,
        path: '/v1/public/yql?q=select%20*%20from%20music.release.popular&format=json',
        method: 'GET'
    };

    var httpRequester = require("./httpRequester");
    httpRequester.http_simple_request(options, function( data ){
        console.log('data: ' + data);        
        console.log('\n\n\n');        
        var json_data = JSON.parse( data );
        var releases = json_data.query.results.Release;
        http_response.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});

        releases.forEach( function(release) {
            http_response.write("<div>");
            http_response.write(release.Artist.name + ": " + release.title );
            http_response.write("</div>");
        });
        
        http_response.end();
    }); 
}

function tvtime(http_response, tail){
    console.log("Request handler 'tvtime' was called, tail:" + tail  );
    var gid="1";
    var channel="1";

    switch( tail.toLowerCase() ){
    case '\\hbo':
        gid="1"; channel="3"; break;
    case '\\axn':
        gid="1"; channel="2"; break;
    case '\\star_movies':
        gid="1"; channel="4"; break;
    case '\\lstime':
        gid="2"; channel="8"; break;
    case '\\star_chinese_movies':
        gid="2"; channel="11"; break;
    default:
    }

    (require('./tvTimetable').tvtime_shower(gid,channel))(http_response);
}

exports.start = start;
exports.tvtime = tvtime;
exports.music=music_release_popular;
