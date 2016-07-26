
var fs = require('fs');
var msg_dir = './public/messages';
var image_dir = './public/images';

function post(req, res) {
    /*console.log(req.body.message);*/
    var msg = req.body.message;
    var tmp_path = req.files.thumbnail.path;    
    var target_path = image_dir + '/' + req.files.thumbnail.name;
    console.log(req.files);
    console.log(req.files.thumbnail.name);
    
    /* move the image to public images*/
    fs.renameSync(tmp_path, target_path);
    console.log('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
    
    /* write message to public messages */
    var message_path = msg_dir + '/' + req.files.thumbnail.name + '.txt';
    fs.writeFileSync(message_path, msg, 'utf8');
        
    get(req, res);
}

function get(req, res) {
    var thumbnails = [];
    var file_list = [];
    fs.readdir(image_dir, function (err, list) {
        console.log(list);
        if (err) throw err;
        list.forEach(function(file) {
            file_path = '/images/' + file;
            msg_path = msg_dir + '/' + file + '.txt';
            console.log(file_path);
            console.log(msg_path);
            var data = fs.readFileSync(msg_path, 'utf8');
            var thumbnail = {'thumbnail': file_path, 'message': data};
            thumbnails.push(thumbnail);
            console.log(file);
        });
        console.log('thumbnails!!!');
        console.log(thumbnails);
        /* get all files under ./public/images/ */
        res.render('index', { name: 'Ada', show: true, thumbnails: thumbnails });     
    });    
}

exports.post = post;
exports.get = get;
