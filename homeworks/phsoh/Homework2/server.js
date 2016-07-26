var http = require("http"),
    url = require("url"),
    logger = require("./Logger"),
    namespace = "server";

/**
* Router to dispatch different handles based on pathname.
* @module server
* @class server
*/
var server = {
    /**
    * Start a server
    * @method start 
    * @param {object} handle    Routing module
    * @param {object} handle    Pahtname to handle matching pairs.
    */
    start: function (route, handle) {
        function onRequest(request, response) {
            var parsedUrl = url.parse(request.url);
            logger.log("Request for " + parsedUrl.pathname + " received.", "INFO", namespace);

            route(handle, parsedUrl, response);
        }

        http.createServer(onRequest).listen(8888);
        logger.log("Server has started.", "INFO", namespace);
    }
};

module.exports = server;
