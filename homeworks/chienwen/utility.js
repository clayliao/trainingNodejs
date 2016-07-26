"use strict";

function getTwoDigits(str) {
    if (str.length < 2) {
        return "0" + str;
    }
    return str;
}

function getCurrentTimeString() {
    var dNow = new Date(),
        timeStr = dNow.getFullYear() + "/" + getTwoDigits((dNow.getMonth() + 1)) + "/" + getTwoDigits(dNow.getDate()) + " " + getTwoDigits(dNow.getHours()) + ":" + getTwoDigits(dNow.getMinutes()) + ":" + getTwoDigits(dNow.getSeconds());
    return timeStr;
}

exports.getCurrentTimeString = getCurrentTimeString;
