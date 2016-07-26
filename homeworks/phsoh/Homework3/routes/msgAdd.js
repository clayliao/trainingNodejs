
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

exports.msgAdd = function(request, response) {
    var namespace = "msgAdd",
        parsedUrl = url.parse(request.url),
        dir = 'public/data/room/',
        person = request.body.person || '',
        room = request.body.room || 'default',
        filename = roomToFilename(room),
        fresh = true,
        data;

    logger.log("Request handler '" + namespace + "' was called.", "INFO", namespace);

    var done = function(err) {
        if (err !== undefined) {
            renderer.redirect(response, '/?room=' + room + '&person=' + person + '&error=' + err);
            return;
        }
        renderer.redirect(response, '/?room=' + room + '&person=' + person);
    };

    var doneImage = function(err) {
        if (err) {
            done('Fail uploading image.');
            return;
        }
        done();
    }

    var saveImage = function(err) {
        if (request.files !== undefined && request.files.image !== undefined && request.files.image.size !== 0) {
            var newFile = fs.createWriteStream('public/data/image/' + filename + request.files.image.name),
                oldFile = fs.createReadStream(request.files.image.path);

            oldFile.addListener("data", function(chunk) {
                newFile.write(chunk);
            });

            oldFile.addListener("close", function() {
                newFile.end();
                fs.appendFile(dir + filename,
                    '<img src="/data/image/' + filename + request.files.image.name + '" /><br/>',
                    doneImage);
            });
            return;
        }
        done();
    };

    var appendText = function(request, response) {
        logger.log("Appending text.", "INFO", namespace);
        fs.appendFile(dir + filename,
            '<span class="person">[' + request.body.person + ']</span> '
            + '<span class="msg">' + request.body.msg + '</span><br/>',
            saveImage);
    };

    if ((request.body.msg !== undefined && request.body.msg !== '')
            && request.body.person !== '') {
        logger.log("Message ready to be written.", "INFO", namespace);
        appendText(request, response);
        return;
    }

    done('Please fill in the field!');
};
