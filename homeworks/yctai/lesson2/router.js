function route(handle, pathname, response) {
    console.log("About to route a request for " + pathname);
    
    p = pathname.split("/");
    console.log(p);
    if (p.length>1) {
        if (typeof handle[p[1]] === 'function') {
            if ( p[1] == "where" || p[1] == 'mysql' ) {
                if ( p.length > 2 )
                    return handle[p[1]](response, p[2]);
                else {
                    return handle[p[1]](response);
                }
            } else {
                return handle[p[1]]();
            }
        } else {
            console.log("No request handler found for " + pathname);
            response.end();
        }
    }
}

exports.route = route;
