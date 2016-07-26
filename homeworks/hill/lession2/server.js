var http = require("http");
var url = require("url");
var yql = require("yql");
var redis = require("redis"),
    client = redis.createClient();

function start(route, handle) {
    "use strict";
    function onRequest(request, response) {
        console.log("Request received.");
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(handle, pathname);

        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        new yql.exec("select * from json where url=@url and itemPath=@path",function(res){
            var items = res.query.results.items;
            var title;
                response.write('<ul>');
            for(var i in items){
                title = items[i].title;
                response.write('<li>'+title+'</li>');
                client.hset("ptt", title, "some value", redis.print);
            }
            client.hkeys("ptt", function (err, replies) {
                'use strict';
                console.log(replies.length + " replies:");
                replies.forEach(function (reply, i) {
                    response.write("<li>" + i + ": " + reply+'</li>');
                });
                client.quit();
            });
                response.write('</ul>');
                response.end();
        },{
            url:"http://www.google.com/reader/api/0/stream/contents/feed/http://rss.ptt.cc/StupidClown.xml?n=20"
            ,path:"json.items"
        });


    }
    http.createServer(onRequest).listen(8888);

    console.log("Server has started.");
}

exports.start = start;
