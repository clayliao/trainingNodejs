var fs = require('fs');
var http = require('http');

function processSRP(data, kw) {
	console.log(data);
	var cnt=data.result.count;
	var srp='';

	if (cnt>0) {
		srp+=
"        <tr><td cols='2' id='summary'>Total record: "+data.result.total+"</td></tr>\n";
		for (var i=0; i<cnt; i++) {
			srp+=
"        <tr>\n"+
"          <td><a href='http://tw.knowledge.yahoo.com/question/question?qid="+data.result.question[i].qid+"'>"+data.result.question[i].subject+"</a></td>\n"+
"          <td>"+data.result.question[i].con_summary+"</td>\n"+
"        </tr>\n";
		}
	}
	else {
		srp=
"        <tr><td> No matched record ~ </td></tr>";
	}

	var html=
"<html>\n"+
"<head>\n"+
"  <title>NodeJS Lesson 2</title>\n"+
"  <link href='menu.css' type='text/css' rel='stylesheet'>\n"+
"</head>\n"+
"<body>\n"+
"  <div id='container'>\n"+
"    <div class='block' id='title'>NodeJS Lesson - 2</div>\n"+
"    <div class='block' id='query'>\n"+
"      <form action='query'>\n"+
"       Query string: <input name='p' size='10' value='"+kw+"' />\n"+
"        <input type='submit' value='Query'>\n"+
"      </form>\n"+
"    </div>\n";
	
	html=html+
"    <div class='block' id='srp'>\n"+
"      <table>\n"+
         srp+
"      </table>\n"+
"    </div>\n";

	html+=
"    <div id='note'>\n"+
"      <ul>What I have done:\n"+
"        <li> Can query for static file (currently only support .html and .css)</li>\n"+
"        <li> Call K+ API to search </li>\n"+
"        <li> Pass JSLint </li>\n"+
"      </ul>\n"+
"    </div>\n";
	html+=
"  </div>\n"+
"</body>\n"+
"</html>\n";
	return html;
}

function successOutput(response, data) {
	//response.writeHead(200, {"Content-Type": "text/plain"});
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(data);
	response.end();
}

function failOutput(response) {
	//response.writeHead(200, {"Content-Type": "text/plain"});
	response.writeHead(404, {"Content-Type": "text/html"});
	response.write('file not found');
	response.end();
}

function queryHandler(params, response) {
	console.log("Request handler 'query' was called.");
	var options= { 
       host: 'q1-vm7.ks.tp2.yahoo.com', 
	   port: 4080, 
	   path: '/v3/search_qa/keyword/'+encodeURI(params['p'])+'?format=json&start=0&count=3',
	   method: 'GET'
	};

	var data='';
	var req = http.request(options, function(res) {
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				data=data+chunk;
			});
			res.on('end', function () {
				data=JSON.parse(data);
				data=processSRP(data, params['p']);
				successOutput(response, data);
			});
	});
	req.on('error', function(e) {
			console.log('XXXXXXXXXXXXXX '+e.message);
			});
	req.end();
}

function isStaticFile(pathname) {
	for (var ext in fileExt) {
		extLen=ext.length;
		begin=pathname.length-extLen;
		filetype=pathname.substr(begin, extLen).toLowerCase();
		if (filetype==ext)
			return true;
	}
	return false;
}

var fileExt={'.html':'text/html', '.css':'text/css'};

function sendFile(pathname, response) {
	fs.exists(pathname, function readFileHandler(exist) {
			if (true==exist) {
			    console.log('Request for static file: '+pathname);
				data=fs.readFileSync(pathname, 'utf-8');
				successOutput(response, data);
			}
			else {
			    console.log("File not exist: "+pathname);
				failOutput(response);
			}
	});
}

function defaultHandler(pathname, response) {
	console.log("Default request handler 'defaultHandler' was called.");

	var sfile='.'+pathname; // otherwise it will be from root
	if (isStaticFile(sfile)) {
		sendFile(sfile, response);
	}
	else {
		console.log("Don't know how to handle request: "+pathname);
		failOutput(response);
	}
}


exports.queryHandler = queryHandler;
exports.defaultHandler = defaultHandler;
