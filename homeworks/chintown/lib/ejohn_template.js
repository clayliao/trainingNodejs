"use strict";

var fs = require('fs');

function loadTemplateSync(templateName, cb) {
	var path, startTime, template;
	path = './template/' + templateName;
	startTime = new Date().getTime();
	while (new Date().getTime() < startTime + 1000 * 3) {
	}
	template = fs.readFileSync(path, 'utf8');
	cb(template);
}
function loadTemplate(templateName, cb) {
	var path = './template/' + templateName;

	fs.readFile(path, 'utf8', function (err, template) {
		if (err) {
			throw err;
		}
		cb(template);
	});
}

var render = function (templateName, data, cb) {
	loadTemplate(templateName, function (template) {
		var replacer, content;
		// re-write the template engine done by John Resig
		// http://ejohn.org/blog/javascript-micro-templating/
		replacer = new Function("obj",
					"var p=[];" +

					// Introduce the data as local variables using with(){}
					"with(obj) {" +
					"	p.push('" +

					// Convert the templateName into pure JavaScript
					template
						.replace(/[\r\t\n]/g, " ")
						.split("<%").join("\t")
						.replace(/((^|%>)[^\t]*)'/g, "$1\r")
						.replace(/\t=(.*?)%>/g, "',$1,'")
						.split("\t").join("');")
						.split("%>").join("p.push('")
						.split("\r").join("\\'") +

					"	');" +
					"} " +
					"return p.join('');"
					);
		content = replacer(data);
		cb(content);
	});
};

//render('query', {'query': 'food', 'descs': ['a', 'b']});
exports.render = render;