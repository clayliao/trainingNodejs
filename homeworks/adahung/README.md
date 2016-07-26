# traingNodejs
## Homework 1
Setup environment and say “Hello World” on browser.

### Learn
    * http server
    * callback
### Run
    $ node server.js
    $ http://localhost:8888

## Homework 2

### Learn
    * handler handles different kind of requests
    * modulize using exports and require
    * parse request by url.parse and querystring.parse
    * call API using http.get (differences between 'data' and 'end')
    * write XML in response
    * JSLint

### Run
    $ node index.js

### Demo
    http://localhost:8888/news?category=lifestyle (Success XML rss from tw.news.yahoo.com/rss/lifestyle)
    http://localhost:8888/news?category=us (NotFound category in tw news so "undefined category" is returned)

## Homework 3
   Please see README.md in hello_express directory
    
