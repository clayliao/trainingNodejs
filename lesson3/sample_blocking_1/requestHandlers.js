function start() {
    console.log("Request handler 'start' was called.");

    function sleep(milliSeconds) {
        var startTime = new Date().getTime();
        do { }
        while (new Date().getTime() <  startTime + milliSeconds);
    }
    // Sleep few seconds for checking if blocking code existed.
    sleep(8000);

    return "Hello Start";
}

function upload() {
    console.log("Request handler 'upload' was called.");
    return "Hello Upload";
}

exports.start = start;
exports.upload = upload;
