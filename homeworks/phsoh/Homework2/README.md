# Readme #

## Homework 2

### Usage

> node index.js

### Configuration

Add your handle at `index.js` and pass to the `server` instance.

> handle["{path}"] = {handle};
>
> // Example:
> var handle = {};
> handle["/"] = requestHandlers.start;
>
> server.start(router.route, handle);

### Helper

* `Renderer.js`	: `Mustache` view engine wrapper.
* `Logger.js`	: Simple but elegant logger.

### Documentation

Modules documentation are well explained in `doc/index.html`.

--------------------

## Homework 1

### Usage

> node server.js

