function evi(responsed, query) {
	"use strict";
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
	    backend = {
            host: 'api.us.evi.com',
            port: 80,
            path: '/direct_answer/?' + url,
            method: 'GET'
	    },

	    req = http.request(backend, function (res) {
            var data = "";
            console.log('get response: ' + res.statusCode);
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                //save raw data
                fs.writeFile(query.query + '.xml', data.toString());
                var answer = parseEvi(data.toString());
                if (answer !== false) {
                    responsed.write("Answer: <b>" + answer.toString() + "</b>");
                } else {
                    responsed.write("Cannot find the answer");
                }
                responsed.write('</body></html>');
                responsed.end();
            });
        }).on('error', function (e) {
            console.log('error: ' + e.message);
        });
	req.end();


}

exports.evi = evi;
