var fs = require("fs"),
    http = require("http"),
    querystring = require("querystring"),
    logger = require("./Logger"),
    renderer = require("./Renderer"),
    namespace = "requestHandlers",
    limit = 100,
    perpage = 100,
    apikey = "cb12bb45f9b04376acc9f0b8b35fa2bf";
//    apikey = '';


/**
* Request Handles.
* Available handles:
*   start: normal result pages
*   notFound: error 404 page
*   icon: favicon
* 
* @module requestHandlers
* @class requestHandlers
*/

function start(parsedUrl, response) {
    var namespace = "start",
        param = querystring.parse(parsedUrl.query);

    logger.log("Request handler 'start' was called.", "INFO", namespace);
    response.writeHead(200, {"Content-Type": "text/plain"});

    // No query
    if (parsedUrl.query === undefined && param.q === undefined) {
        logger.log("No query, default page is loaded.", "INFO", namespace);
        renderer.render("template/default.html", {}, function (parsedHtml) {
            renderer.output(response, 200, "text/html", parsedHtml);
        });
        return;
    }

    // Check if api key is set
    logger.log("Query received: " + param.q, "INFO", namespace);

    if (apikey === '') {
        logger.log("Flickr api key is not yet set!", "ERROR", namespace);
        renderer.render("template/default.html", {q: param.q, error: 'Flickr API key is not set.'}, function (parsedHtml) {
            renderer.output(response, 200, "text/html", parsedHtml);
        });
        return;
    }

    // Send request to flickr
    var data = querystring.stringify({
            method: 'flickr.photos.search',
            api_key: apikey,
            text: param.q,
            per_page: perpage,
            format: 'json',
            sort: 'interestingness-desc',
            nojsoncallback: 1
        }),
        options = {
            host: 'api.flickr.com',
            path: '/services/rest?' + data,
            method: 'GET'
        },
        req;

    req = http.request(options, function(result) {
        var chunks = '';

        result.on('data', function(chunk) {
            chunks += chunk;
        });

        result.on('end', function() {
            var parsedChunk = JSON.parse(chunks);

            if (parsedChunk.photos.photo === null) {
                renderer.render("template/default.html", {q: param.q, error: 'No results found.'}, function (parsedHtml) {
                    renderer.output(response, 200, "text/html", parsedHtml);
                });
                return;
            }

            // Result page
            logger.log("Result page is loaded.", "INFO", namespace);
            renderer.render("template/result.html", {q: param.q, result: parsedChunk.photos.photo}, function (parsedHtml) {
                renderer.output(response, 200, "text/html", parsedHtml);
            });
        });
    });

    req.end();

}

function notFound(parsedUrl, response) {
    var namespace = "notFound";

    logger.log("Request handler 'notFound' was called.", "INFO", namespace);

    renderer.render("template/404.html", {path: parsedUrl.pathname}, function (parsedHtml) {
        renderer.output(response, 404, "text/html", parsedHtml);
    });
}

function icon(parsedUrl, response) {
    var namespace = "icon";

    logger.log("Request handler 'icon' was called.", "INFO", namespace);

    fs.readFile("images/favicon.ico", function (err, data) {
        if (err) {
            logger.log("Error reading 'favicon.ico'.", "ERROR", namespace);
            return;
        }

        renderer.output(response, 200, "image/x-icon", data);
    });
}

exports.start = start;
exports.notFound = notFound;
exports.icon = icon;

