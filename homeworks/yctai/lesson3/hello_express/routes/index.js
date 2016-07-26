
/*
 * GET home page.
 */

var fs = require('fs');

var getJSON = function(path) {
    var fileContents = fs.readFileSync(path, 'utf8');
    return fileContents;
}

exports.index = function(req, res) {
    console.log("enter index");
    var data = getJSON('views/simple.json');
    res.render('simple.mustache', { 'message': 'Hello Worldddd', 'items':['aaaa','bbb','ccc']});
};

exports.image = function(req, res) {
    console.log("enter image: " + req.path);
    p = req.path.split("/");
    
    if ( p.length > 2 ) {
        fs.readFile('/tmp/'+p[2], function (err, data) {
            if (err) { 
                console.log('unable to read image');
            } else {
                console.log(data);
                res.sendfile( '/tmp/' + p[2] );
            }
        });
    }
        
};

exports.record = function(req, res) {

    console.log("enter record.");

    var mysql = require('mysql');
    var db = 'nodejs';
    var table = 'guestbook';
    var client = mysql.createClient({
        user: 'nodejs',
        password: 'jsnode'
    });

    client.host = 'localhost';

    var readfromfile = function (err) {
        if (err) {
            var fs = require('fs');
            fs.readFile('/tmp/guestbook.db', 'utf-8', function(err, data){
                if (err) {
                    console.log('read file error');
                } else {
                    console.log(data);
                    var lines = data.split("\n");
                    console.log(lines);
                    var results = [];
                    for ( var i=0; i<lines.length; i++ ) {
                        if ( lines[i].length > 0 ) {
                            var line = lines[i].split('|');
                            results[i] = { 'text':line[0], 'description':line[1], 'file':line[2] }
                        }
                    }
                    res.render('simple.mustache', {'data':results} );
                }
            });
        } else {


            client.query( 'select * from ' + table, function selectCb(err, results, fields){
                console.log(results);                                           
                res.render('simple.mustache', {'data':results} );
    });
        }
    }
    client.useDatabase(db, readfromfile);
};
