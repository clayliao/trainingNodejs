"use strict";

/*
 * GET home page.
 */

var fs = require('fs');
var exec = require('child_process').exec;

exports.index = function (req, res) {
    var qmap = req.query, err = '',
        names = [], msgs = [],
        data, lines, parts, i,
        cmd = '';

    data = fs.readFile('orders.txt', "utf8", function (err, data) {
        lines = data.split("\n");

        for (i = 0; i < lines.length; i++) {
            parts = lines[i].split("\t");
            if (parts.length === 2) {
                names.push(parts[0]);
                msgs.push(parts[1]);
            }
        }

        if ((typeof qmap.user === 'undefined') && (typeof qmap.user === 'undefined')) {
            // landing, do nothing
            err = 'NEXT! WHAT TO DRINK? >: |';
        } else if ((qmap.user === '') || (qmap.msg === '')) {
            qmap.user = qmap.msg = '';
            err = "I'm busy.. don't fool me >: |";
        } else {
            if ((qmap.user === names[names.length - 1])
                    && (qmap.msg === msgs[msgs.length - 1])) {
                err = qmap.user + ", you drink too much...I won't serve you anymore. NEXT!;"
            } else {
                cmd = "echo '" + qmap.user + "\t" + qmap.msg + "' >> orders.txt";
                exec(cmd, function (error, stdout, stderr) {
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                });

                names.push(qmap.user);
                msgs.push(qmap.msg);
                err = 'NEXT! >: |'
            }
        }

        res.render('index', {
            title: 'Expresso',
            users: names,
            msgs: msgs,
            err: err
        });
    });
};
