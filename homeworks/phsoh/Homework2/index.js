var server = require("./server"),
	router = require("./router"),
	requestHandlers = require("./requestHandlers"),
	logger = require("./Logger");

logger.setLevel("INFO");

/* TODO */
// Handle parsers!
var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/404"] = requestHandlers.notFound;
handle["/favicon.ico"] = requestHandlers.icon;

server.start(router.route, handle);

