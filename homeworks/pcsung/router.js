function route(handle, pathname, request, response){
    console.log('Route a request for '+pathname);
    
    if (typeof handle[pathname] === 'function') {
        handle[pathname](request, response);
    } else {
        console.log('No request handler for '+ pathname);
    }
}

exports.route = route;