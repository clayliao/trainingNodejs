Nodejs Training (Yiwei)
==============

# Lesson 2
A workable version which has no modulization at all
## How to run
1. Launch lesson2/index.js under homeworks/ywchen via node
    $ node lesson2/index.js
2. Open a browser and go to http://localhost:8888

Should expect to see a MWC output :p

## Random Notes
### jslint
In ~/.jslintrc, put jslint directives

<code>/*jslint: browser: true, node: true, bitwise: true, nomen: true, plusplus: true, indent: 4 */

/*global: YUI, YUITest */</code>

### git
Sync Clay's repo (w/ everyone's hw) to local

<code>$ git pull origin</code>

Do the local change; git add them

<code>$ git add blahblah</code>

<code>$ git commit</code>

Sync my forked remote

<code>$ git push ywchenhw master</code>

### node

http.createServer takes a callback (that will added to 'request' event),
which takes 2 parameters:

1. [http.ServerRequest](http://nodejs.org/api/http.html#http_class_http_serverrequest) object
2. [http.ServerResponse](http://nodejs.org/api/http.html#http_class_http_serverresponse) object

The callback passed to [http.request](http://nodejs.org/api/http.html#http_http_request_options_callback)
(that will added to 'response' event of that request) takes a parameter:

* [http.ClientResponse](http://nodejs.org/api/http.html#http_http_clientresponse) object

The even 'data' of ClientResponse is emitted *whenever* a piece of body is received,
so it might be invoked multiple times to fetch through the whole response.

There's an 'end' event in ClientResponse, so end the serverResponse in that end event;
ending the serverResponse outside of http.request's callback will lead to interruption of writing
since the ordering is not determined! (yay to functional programming)

Questions to think about: How to write a response header explicitly?


# Lesson 1 
## How to run
1) Launch server.js via node
    $ node server.js
2) Open a browser and go to http://localhost:8888

Expect to see Hello World in the browser
