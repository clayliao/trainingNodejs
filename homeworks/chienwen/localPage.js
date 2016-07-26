"use strict";

var http = require("http");
var log = require("./log");
var config = require("./config");
var querystring = require("querystring");

function generateLocalHead() {
    var html = '<meta charset="utf-8" /><style>';
    html += '.srpTitle{ font-size: 20px; margin-bottom: 20px; color: blue; }';
    html += '.listing{ border: thin solid; float: left; display: inline; width: 45%}';
    html += '.listing .title { font-weight: bold; font-size: 16px; }';
    html += '</style>';
    return html;
}

function generateLocalSearchForm(p, addr) {
    var str = '';
    str += '<h2>Local Search International</h2>';
    str += '<form method="get" action="/srp">';
    str += '<input type="text" name="p" placeholder="" ';
    if (p) {
        str += 'value="' + p + '"';
    }
    str += ' /> ';
    str += '<input type="text" name="addr" placeholder="Global Locations" ';
    if (addr) {
        str += 'value="' + addr + '"';
    }
    str += ' />';
    str += '<input type="submit" value=" Search " />';
    str += '</form>';
    return str;
}

function localToHTML(data) {
    var i, html = '<div class="srpTitle">' + data.title + '</div>', info;
    for (i = 0; i < data.data.length; i++) {
        html += '<div class="listing">';
        html += '<div class="title">' + data.data[i].name + '</div>';
        if (data.data[i].category) {
            html += '<div class="category">' + data.data[i].category + '</div>';
        }
        if (data.data[i].location) {
            html += '<div class="map"><a href="http://maps.yahoo.com/#q=' + data.data[i].location.lat + '%2C' + data.data[i].location.lon + '"><img src="http://gws2.maps.yahoo.com/MapImage?appid=search&clat=' + data.data[i].location.lat + '&clon=' + data.data[i].location.lon + '&zoom=15&imh=100&imw=100&poi=%2C%2C%2Cll%3B%2Cmrk_str.gif%2C' + data.data[i].location.lat + '%2C' + data.data[i].location.lon + '" /></a></div>';
        }
        if (data.data[i].info) {
            info = data.data[i].info;
            if (info.tel) {
                html += '<div class="info">Phone: ' + info.tel + '</div>';
            }
            if (info.address) {
                html += '<div class="info">Address: ' + info.address + '</div>';
            }
            if (info.hours) {
                html += '<div class="info">HOO: ' + info.hours + '</div>';
            }
            if (info.price) {
                html += '<div class="info">Price: ' + info.price + '</div>';
            }
            if (info.dish) {
                html += '<div class="info">Recommendation: ' + info.dish + '</div>';
            }
        }
        if (data.data[i].fbaddr) {
            html += '<div class="addr">Address: ' + data.data[i].fbaddr + '</div>';
        }
        html += '</div>';
    }
    return html;
}

function triggerLocalSearchResult(response, queries) {

    var postData = querystring.stringify({
            'p': queries.p,
            'addr': queries.addr,
            'key': config.localApi.key
        }),
        options = {
            host: config.localApi.host,
            port: config.localApi.port,
            path: config.localApi.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        },

        req = http.request(options, function (res) {
            var pageData = "";
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                pageData += chunk;
            });
            res.on('end', function () {
                var data = JSON.parse(pageData);
                response.write(localToHTML(data));
                response.write('</body></html>');
                response.end();
            });
            res.on('error', function (e) {
                log.error("API error: " + e.message);
                response.write('ERROR.</body></html>');
                response.end();
            });
        });

    req.write(postData);
    req.end();
}

exports.generateLocalSearchForm = generateLocalSearchForm;
exports.generateLocalHead = generateLocalHead;
exports.triggerLocalSearchResult = triggerLocalSearchResult;
