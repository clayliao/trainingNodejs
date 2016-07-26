"use strict";

var utility = require("./utility");

function info(msg) {
    console.log("INFO [" + utility.getCurrentTimeString() + "]\t" + msg);
}
function warn(msg) {
    console.log("WARNING [" + utility.getCurrentTimeString() + "]\t" + msg);
}
function err(msg) {
    console.log("ERROR [" + utility.getCurrentTimeString() + "]\t" + msg);
}

exports.info = info;
exports.warn = warn;
exports.err = err;
