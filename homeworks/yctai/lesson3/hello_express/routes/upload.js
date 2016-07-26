exports.upload= function(req, res) {
    console.log("enter upload");
    console.log('text: ' + req.param('textline') );
    console.log('description: ' + req.param('description') );
    
    var image = req.files.datafile;
    var fs = require('fs');
    fs.rename( image.path, '/tmp/'+ image.name, function(e) {
        if (e) { 
            console.log('rename image failed');
        } else {
            console.log('rename successfully');
        }
    });

    var mysql = require('mysql');
    var db = 'nodejs';
    var table = 'guestbook';
    var client = mysql.createClient({
        user: 'nodejs',
        password: 'jsnode'
    });
    var text = req.param('textline');
    var description = req.param('description');
    var file = image.name;

    client.host = 'localhost';
   
    var write2file = function(err) {
        if ( err ) {
            console.log('unable to write to MySQL, write to regular file');
            var fs = require('fs');
            var data = text + '|' + description + '|' + file + "\n";
            fs.appendFile('/tmp/guestbook.db', data, function (err){
                console.log('appending: ' + data);
                if (err) console.log('error in append data to file');
            });
        } else {
            console.log('write to MySQL successfully');
            var query_str = 'insert into ' + table + ' ' + 'set text="' + text + '", ' + 'file="'+ file + '", ' + 'description="'+ description + '"';
            client.query(query_str);
        }
    }

    client.useDatabase(db, write2file);
    res.render('upload.mustache', {'text':text, 'description':description, 'file':file} );
}
