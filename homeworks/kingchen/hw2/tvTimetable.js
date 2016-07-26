/*global require, exports, console*/

var httpRequester = require("./httpRequester"); 

/* tvtime_shower: output the time table and save it to mysql
 * return a function 
 */
function tvtime_shower(gid,channel) {
    var options = {
        host: 'yql.yahooapis.com',
        port: 80,
        path: '/v1/public/yql?q=USE%20%22http%3A%2F%2Fkingchen.webuda.com%2Ftvtime.xml%22%20as%20tvtime%3B%20select%20*%20from%20tvtime%20where%20gid%3D%22'+ gid +'%22%20and%20channel%3D%22' + channel + '%22%3B&format=json',
        method: 'GET'
    };

    return function(http_response){
        var show_tv_table = function ( data ){
            console.log('data: ' + data);

            var json_data = JSON.parse( data );
            var programs = json_data.query.results.program;
            var date = new Date(json_data.query.created);
            http_response.writeHead(200, {"Content-Type": "text/html; charset=UTF-8"});

            var mysql_requester=require('./mysqlRequester').simple_mysql_requester('hv5-vm01.search.pool.corp.tw1.yahoo.com', 'kingchen');


            http_response.write("<h2>" + date.toDateString() + "</h2>");
            programs.forEach( function(program) {
                http_response.write("<div>");
                http_response.write(program.time + "\t" + program.title );
                http_response.write("</div>");

                mysql_requester.query('INSERT INTO nodejs_training.tvtime (`date`,`channel`,`time`,`title`) VALUES ("' + date.toDateString() + '","' + gid +":" + channel + '","' + program.time + '","' + program.title + '")');
            });

            http_response.end();
            mysql_requester.end();
        };

        var httpRequester = require("./httpRequester");
        httpRequester.http_simple_request(options,show_tv_table);
    };
}

exports.tvtime_shower=tvtime_shower;
