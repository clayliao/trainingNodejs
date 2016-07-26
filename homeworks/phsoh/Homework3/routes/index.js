
/*
 * GET home page.
 */
var url = require("url"),
    querystring = require("querystring"),
    logger = require("../Logger"),
    renderer = require("../Renderer"),
    fs = require("fs");

function roomToFilename(room) {
    var output = '',
        i;
    for (i = 0; i < room.length; i++) {
        output += room.charCodeAt(i);
    }

    return output;
}

exports.index = function(request, response) {
    var namespace = "start",
        parsedUrl = url.parse(request.url),
        dir = 'public/data/room/',
        param = querystring.parse(parsedUrl.query),
        person = param.person || '',
        errormsg = param.error || '',
        room = param.room || 'default',
        filename = roomToFilename(room),
        fresh = true,
        data;

    logger.log("Request handler '" + namespace + "' was called.", "INFO", namespace);

    var renderOutput = function(response, data) {
        renderer.render("views/index.html", data, function (parsedHtml) {
            renderer.output(response, 200, "text/html", parsedHtml);
        });
    };

    var roomExists = function (exists) {
        fresh = !exists;
        data = {title: 'Y! Guestbook', room: room, fresh: fresh, person: person, error: errormsg};

        if (fresh) {
            logger.log("Room `" + room + "` not exists.", "INFO", namespace);
            renderOutput(response, data);
            return;
        }

        logger.log("Room `" + room + "` exists.", "INFO", namespace);
        fs.readFile(dir + filename, function(err, file) {
            if (err) {
                logger.log("Fail to read room `" + room + "`.", "INFO", namespace);
                renderer.redirect(response, '/');
                return;
            }

            data.data = file;
            renderOutput(response, data);
        });
    };

    fs.exists(dir + filename, roomExists);
};
