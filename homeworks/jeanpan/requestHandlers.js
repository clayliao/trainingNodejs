function start(query, response) {
  "use strict";
  //console.log("Request handler 'start' was called.");
  response.write("<h3>Request handler 'start' was called.<h3>");
  
  response.write("</body>");
  response.write("</html>");
  response.end();
}

function upload(query, response) {
  "use strict";
  //console.log("Request handler 'upload' was called.");
  response.write("<h3>Request handler 'upload' was called.</h3>");
  
  response.write("</body>");
  response.write("</html>");
  response.end();
}

function akp(query, response) {
  "use strict";

	var http = require("http"),
      key = query.keyword,
      options = {
      host: 'q1-vm7.ks.tp2.yahoo.com',
      port: 4080,
      path: '/v3/search_qa/keyword/'+ key + '?format=json',
      method: 'GET'
      };

  response.write("<h1>Keyword : " + key + "</h1>");

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
            len = que.length,
            i;

		    for(i = 0 ; i < len; i += 1) {
          response.write("<h3>" + que[i].subject + "</h3>");
          response.write("Comment : " + que[i].con_summary + "<br/>");
          response.write("Answer : " + que[i].ans_summary + "<br/>");          
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

    // write data to request body
    //req.write('data\n');
    //req.write('data\n');
    req.end();
}

exports.start = start;
exports.upload = upload;
exports.akp = akp;
