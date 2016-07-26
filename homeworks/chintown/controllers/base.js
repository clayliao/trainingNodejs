"use strict";

function sleep(request, responseWriter) {
	var startTime = new Date().getTime();
	while (new Date().getTime() < startTime + 1000 * 10) {
	}
	responseWriter.writeEnd("(ΦωΦ)");
}
function on404(request, responseWriter) {
	responseWriter.writeEnd("no no no", 404);
}

exports.sleep = sleep;
exports.on404 = on404;
