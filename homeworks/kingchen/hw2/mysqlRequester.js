/*global require, exports, console*/

function simple_mysql_requester(host,user){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : host,
        user     : user
    });

    connection.connect(function(err){
        if( err !== null ){
            console.log('mysql connect error: ' + err );
        }
    });
    
    return {
        query: function( qry ){
            connection.query(qry, function(err, rows, fields) {
                if (err){ 
                    console.log('mysql query error: ' + err );
                }
            });
        },
        end: function(){
            connection.end();
        }
    };
}

exports.simple_mysql_requester=simple_mysql_requester;