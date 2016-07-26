var mysql, TEST_DATABASE, TEST_TABLE, client, sql, dbconfig;

mysql = require('mysql');
TEST_DATABASE = 'nodejs';
TEST_TABLE = 'hw2_history';
dbconfig = {
    host: 'localhost',
    port: '3366',
    user: 'root',
    password: ''
};

function createDB() {
    client = mysql.createClient(dbconfig);

    client.query('CREATE DATABASE ' + TEST_DATABASE, function (err) {
        if (err && err.number !== mysql.ERROR_DB_CREATE_EXISTS) {
            console.log(err);
            throw err;
        }
    });

    console.log('DATABASE ' + TEST_DATABASE + ' created.');

    client.end();
    console.log('Closed.');
}

function createTable() {
    //client.query('USE ' + TEST_DATABASE);
    //console.log('USE ' + TEST_DATABASE);

    dbconfig.database = TEST_DATABASE;
    client = mysql.createClient(dbconfig);

    sql = 'DROP TABLE ' + TEST_TABLE + '; ' +
        'CREATE TABLE ' + TEST_TABLE +
        ' (query VARCHAR(255), ' +
        'created DATETIME' +
        ');';

    //console.log(sql);
    client.query(sql);
    console.log('TABLE ' + TEST_TABLE + ' created.');

    client.end();
    console.log('Closed.');
}

function insertRecord(query) {
    dbconfig.database = TEST_DATABASE;
    client = mysql.createClient(dbconfig);

    sql = 'INSERT INTO ' + TEST_TABLE +
        " SET query = '" + query + "', created = NOW();";

    //console.log(sql);
    client.query(sql,
        function selectCb(err, results, fields) {
            if (err) {
                throw err;
            }
        });

    console.log('Insert one record.');

    client.end();
    console.log('Closed.');
}

// get search history and print on the broswer
function getRecords(response) {
    var records;
    dbconfig.database = TEST_DATABASE;
    client = mysql.createClient(dbconfig);

    console.log('Get one record.');
    client.query(
        'SELECT DISTINCT query FROM (SELECT query FROM ' + TEST_TABLE + ' ORDER BY created DESC) AS T LIMIT 10;',
        function selectCb(err, results, fields) {
            if (err) {
                throw err;
            } else {
                console.log(results);
                console.log(fields);
                records = results;
               
                response.write('<div style="margin-bottom: 5px;">Search History: ');
                var i, row;
                for (i = 0; i < results.length; i++) {
                    row = results[i];
                    if (i !== 0) {
                        response.write(', ');
                    }
                    response.write('<a href="/search?p=' + encodeURI(row.query) + '">' + row.query + '</a>');
                }
                response.write('</div>');
                
            }
            client.end();
            console.log('Close');
        }
    );

    return records;
}

exports.createDB = createDB;
exports.createTable = createTable;
exports.insertRecord = insertRecord;
exports.getRecords = getRecords;
