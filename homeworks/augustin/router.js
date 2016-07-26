function route(handle, pathname, resp, query) {
    console.log("About to route a request for " + pathname);

    if (typeof handle[pathname] === 'function') {
        handle[pathname](resp, query);
    } else {
        console.log("No request handler found for " + pathname);
        response.write("<H2>Unknown path name: " + pathname + "</H2>");
    }
}

exports.route = route;
