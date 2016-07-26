/*global require, console, exports*/
/*
 * GET home page.
 */
exports.index = function(req, res){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'hv5-vm01.search.pool.corp.tw1.yahoo.com',
        user     : 'kingchen',
        database : "nodejs_training"
    });

    connection.connect(function(err){
        if( err !== null ){
            console.log('mysql connect error: ' + err );
        }
    });

    var qry = connection.query('SELECT * FROM img_msg ORDER BY timestamp DESC');
    var row_list = [];
    qry.on('error', function(err) {
        console.log('mysql query error: ' + err );
    }).on('result', function(row) {
        //connection.pause();

        console.log("mysql read: file: " + row.filename);
        require("fs").writeFileSync("public/images/"+row.filename, row.msg_content);
        console.log("mysql file saved done");

        var row_object = {
            msg: row.msg, 
            filename: row.filename
        };

        row_list.push(row_object);
        //connection.resume();
    }).on('end', function() {
        console.log("connection end");
        connection.end();
        // all rows have been received

        res.render('index', 
                   { title: 'Simple Homework3', 
                     row: row_list
                   }
                  );
    });
};

exports.upload = function(req, res, next){
    console.log("index.upload");
    require('fs').readFile(req.files.image.path, function (err, data) {
        if (err){
            console.log("error at readfile");
            return; 
        }

        var mysql      = require('mysql');
        var connection = mysql.createConnection({
            host     : 'hv5-vm01.search.pool.corp.tw1.yahoo.com',
            user     : 'kingchen',
            database : "nodejs_training"
        });

        connection.connect(function(err){
            if( err !== null ){
                console.log('mysql connect error: ' + err );
                throw err;
            }
        });

        var post  = { msg_content: data,
                      filename:require("path").basename(req.files.image.path, '\\'), 
                      msg:req.body.message, 
                      extension:req.files.image.type };
        connection.query('INSERT INTO img_msg SET ?', post, 
                         function(err, rows, fields) {
                             if (err){
                                 console.log('mysql query error: ' + err );
                                 throw err;
                             }
                             connection.end();
                         });
    });
    
    next();
};
