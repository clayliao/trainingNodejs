var http = require("http");

function start() {
    console.log("Request handler 'start' was called.");
}

function upload() {
    console.log("Request handler 'upload' was called.");
}

function where(response, csz) {

    console.log("Request hanlder 'where' was called.");
    var http = require("http");

/*
    var options = {
        host: 'gws2.maps.yahoo.com',
        port: 80,
        path: '/findlocation?q=sunnyvale+ca&appid=YahooDemo',
        method: 'POST'
    };
    var data;
    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
        });
    });
req.write('data\n');
    req.write('data\n');
    req.end();
*/
    http.get("http://gws2.maps.yahoo.com/findlocation?q="+csz+"&appid=YahooDemo", function(res) {
        console.log("Got response: " + res.statusCode);
        response.writeHead(200, res.headers);
        res.content = "";
        res.on('data', function (chunk) {
            response.write(chunk);
            res.content = res.content + chunk;
        });
        res.on('end', function (e) {
            response.end();
            var mysql = require('mysql');    
            var db = 'nodejs';
            var table = 'findlocation';
            var client = mysql.createClient({
                user: 'nodejs',
                password: 'jsnode'
            });
           
            client.host = 'localhost';
            client.useDatabase(db);

            console.log( 'ALL BODY: ' + escape(res.content) );
            client.query( 'insert into ' + table + ' ' + 'set location="' + csz + '", ' + 'content="'+ escape(res.content) + '"');
                
        });
    }).on('error', function(e) {
        console.log("err");
    });
}

function mysql(response) 
{
    console.log("Request hanlder 'mysql' was called.");

    var mysql = require('mysql');    
    var db = 'nodejs';
    var table = 'findlocation';
    var client = mysql.createClient({
        user: 'nodejs',
        password: 'jsnode'
    });

    client.host = 'localhost';
    client.useDatabase(db);

    client.query( 'select * from ' + table, function selectCb(err, results, fields){
        console.log(results);
        response.write('<html><body><table>');
        for ( i=0; i<results.length; i++ ){
            response.write('<tr>');
            response.write('<td>'+results[i]['id'].toString()+'</td>');
            response.write('<td>'+results[i]['location'].toString()+'</td>');
            response.write('<td>'+results[i]['content'].toString()+'</td>');
            response.write('</tr>');
        }
        response.write('</table></body></html>');
        client.end();
        response.end();
    });
}

exports.start = start;
exports.upload = upload;
exports.where = where;
exports.mysql = mysql;

