var sys = require("sys");
var fs = require("fs");
var renderEng = require("mustache");
var logger = require("./Logger");

/**
* Simple renderer using `mustache`.
*
* @module Renderer
* @class Renderer
*/
var Renderer = {
    namespace: "Renderer",

    /**
    * Return a render function with predefined template.
    * @method render
    * @static
    * @param {string} template Path for Mustache template.
    * @param {object} data Data to be inserted into the template.
    * @param {function} callback Callback function.
    */
    render: function (template, data, callback) {
        var namespace = this.namespace;
        var preparedData = data;
        fs.readFile(template, function (err, parsed) {
            if (err) {
                logger.log('Fail to read template file: ' + template, 'ERROR', namespace);
                return;
            }

            try {
                var response = renderEng.to_html(parsed.toString(), preparedData);
                callback(response);
            } catch (e) {
                console.log(e);
                logger.log('Fail to parse template file: ' + template, 'ERROR', namespace);
            }
        });
    },

    /**
    * Write data to HTTP response object with status code and data.
    * @method output
    * @static
    * @param {object} response HTTP response object
    * @param {number} status HTTP status.
    * @param {string} contenttype HTTP content-type
    * @param {string} data HTTP body.
    */
    output: function (response, status, contenttype, data) {
        var namespace = this.namespace;

        logger.log("Writing response.", "INFO", namespace);
        response.writeHead(status, {"Content-Type": contenttype});
        response.write(data);
        response.end();
        logger.log("Response sent.", "INFO", namespace);
    },

    /**
    * Redirect
    * @method output
    * @static
    * @param {object} response HTTP response object
    * @param {string} location Redirect path.
    */
    redirect: function(response, location) {
        var namespace = this.namespace;

        logger.log("Redirection.", "INFO", namespace);
        response.writeHead(303, {"Location": location});
        response.end();
    }
};

module.exports = Renderer;