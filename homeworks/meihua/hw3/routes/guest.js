var fs = require("fs");

exports.get = function (req, res) {
    res.render('guest', {
        name: 'Guest',
        msg: 'Your message will post here.',
        image: 'Balloon.bmp'
    });
};

exports.post = function (req, res) {
    var msg, name, tmp_path, target_path, image_name;

    name = req.body.name !== '' ? req.body.name : 'Guest';
    msg = req.body.msg !== '' ? req.body.msg : 'EMPTY!!';
    image_name = 'Balloon.bmp';

    //msg = msg.replace("\r\n", "<br>");

    console.log(req.body);
    console.log(req.files);

    if (req.files.image.name !== '') {
        tmp_path = req.files.image.path;
        target_path = './public/images/' + req.files.image.name;

        fs.readFile(tmp_path, function (err, data) {
            if (err) { throw err; }

            fs.writeFile(target_path, data, function (err) {
                if (err) { throw err; }

                image_name = req.files.image.name;

                res.render('guest', {
                    name: name,
                    msg: msg,
                    image: image_name
                });
            });
        });
    } else {
        res.render('guest', {
            name: name,
            msg: msg,
            image: image_name
        });
    }
};

