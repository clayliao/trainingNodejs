"use strict";
var events = require("events");
var emitter = new events.EventEmitter();

function invokeController(pathname, request, response, context) {
    var controllerPath = "./controllers" + pathname,
        controller = require(controllerPath);
    console.log("Dispatching to controller to path " + controllerPath);
    controller.run(request, response, context, function (viewPath) {
        emitter.emit("render", viewPath, request, response, context);
    });
}

function renderView(pathname, request, response, context) {
    var viewPath = "./views/" + pathname,
        view = require(viewPath);
    console.log("Rendering view in path " + viewPath);
    response.writeHead(200, {"Content-Type" : "text/html"});
    view.render(request, response, context);
    response.end();
}

emitter.on("render", renderView);

exports.invokeController = invokeController;
exports.renderView = renderView;