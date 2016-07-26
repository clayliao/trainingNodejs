var logger = require("./Logger"),
    namespace = "route";

/**
* Router to dispatch different handles based on pathname.
* @module route
* @class route
*/
var router = {
    /*
    * @method route 
    * @param {object} handle    Pahtname to handle matching pairs.
    * @param {object} parsedUrl Parsed URL object.
    * @param {object} response  HTTP response object.
    */
    route: function (handle, parsedUrl, response) {
        logger.log("About to route a request for " + parsedUrl.pathname, "INFO", namespace);

        if (typeof handle[parsedUrl.pathname] === 'function') {
            handle[parsedUrl.pathname](parsedUrl, response);
        } else {
            logger.log("No request handler found for " + parsedUrl.pathname, "ERROR", namespace);
            handle["/404"](parsedUrl, response);
        }
    }
};

module.exports = router;