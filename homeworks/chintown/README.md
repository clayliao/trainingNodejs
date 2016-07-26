# chintown @ homework 3
## Subject

implement a guestbook-liked drink ordering board

## What
- build with `express` and `jade`
- customised **template** 
  	- `views/index.jade`
  		 - provides an ordering *form* with **name** and **order** fields (*both are required*)
  		 - provides a list of submitted items
- customised **router**
	- `routes/index.js` 
	    - stores submitted data in file fashion
	    - checks required fields
	    - reads submitted data (*history*) from file
	    - checks duplicated submission
	    - append the current submission to file
	    - returns the *history* with current submission to template engine
	    
## How
- install `express` and `jade`
- `cd hw3; node app.js`
- open [http://localhost:3000](http://localhost:3000)
- submit order by http://localhost:3000?user={user}&msg={order}
- YOU CAN TRY TO
	- submit incomplete form
	- submit the same information twice
  	
## Expected results
### On the Page

#### ordering form

```html
…
<h3>make an order</h3>
<form method="get" target="./">
	<label>Name<input name="user" value=""></label><br>
	<label>Desire<textarea name="msg">Blended Ice Coffee, No Sugar Added, Mocha</textarea></label><br>
	<input type="submit">
</form>
… 
```
#### ordered list

```html
<h3>delivered drinks</h3>
<div id="comments">
	<li>mike - coffeelgood</li>
	<li>agigo - walaluluhuhaha</li>
</div>
```
  	
- - -  
# chintown @ homework 2

## Subject

- user can lookup vocabulary by querying `/query?q=<vocabulary>` 
- server lists the definitions fetched from [Yahoo! TW Dictionary](http://tw.dictionary.yahoo.com/)
	- server render the result with given template file
- server adds each definition into database

## What
- `controllers/`
	- `homework2.js`
		- contains new `query handler` for querying  **Yahoo! TW Dictionary**
		- works with the routing entry, `/query?p=`
- `lib/`	 	
	- `ydict.js`
		- fetches raw html result of **Yahoo! TW Dictionary**
		- parses the *translation* part and renderㄋ simple *definition list* on the page (check [sample output](#on-the-page))
	- `dev.js`
 		- provides development tools for inspecting variables
 			- `de` -  short command for `console.log`
	 		- `varExport` - better variable inspecting via native `util` module
	- `http.js`
 		- provides handy methods which simplify the usability of `http` module
 	- `mysql.js`
 		- provides handy method which executes one-time insertion of DB transaction
- `conf/`
	- `mysql.js`	
		- stores the connection information of target database
- `template/`
	- `query.html`
		- the html template
   
## How

0. *[optional]* 
	- *setup a mysql instance*
	- *add connection information in the `mysql.js`*
1. $ `node server.js`
2. open [http://localhost:8888/query?p=fin](http://localhost:8888/query?p=fin)

## Expected result

### On the Console

- each request will writes starting/ending message which could be useful for checking execution sequence while multiple requests received:
	- `[INFO] handling "<query>" ... start`
	- `[INFO] handling "<query>" ... end`
- each description line will trigger one DB insertion which writes the following message:
	- `[INFO] DB updated!`

### On the Page

```html
<html>
...
<dl>
	<dt>fin</dt>
	<dd>鰭; 鰭狀物</dd>
	<dd>(潛水用的或船的)鰭板; (飛機的)安定翼; (潛艇的)水平舵</dd>
</dl>
…
</html>
```

- - - 
# chintown @ lesson 2

## Subject

implement simple routing mechanism with different request handlers

## What
 - **server**
 	- gets proper **request handler** from **router** by the requesting **path** of url (e.g. http://localhost:8888/**path**?foo=bar)
	- delegates all the works of `onRequest` to **request handler**
 - **router**
 	- requires different **request handler** from various available codes
 	- maintains a **lookup table** which stores the  	mapping of **path** and **request handler**
 	- identifies the **path** from the given requesting url
 	- returns proper **request handler** by **path**; fallback on *404 handle* if the **path** is invalid

 - **request handler** (aka *controller* in the code)
    - behaves as `onReqest` method
    	- gets `request` and `response` as input parameters
    	- writes content through `response`

## How

 - $ `node server.js`
 - open the following links in browser and check the response

## Expected result

 - **default** [http://localhost:8888](http://localhost:8888)
 	- as **start**
 - **start** [http://localhost:8888/start](http://localhost: 8888/start)
 	- pong
 - **upload** [http://localhost:8888/upload](http://localhost:8888/upload)
 	- got it
 - **invalid** [http://localhost:8888/deny](http://localhost:8888/deny)
 	- no no no

- - -

# chintown @ homework 1

## Subject

create a http server which responses simple welcome message

## JSLint

applied configurations

 - `--browser`
 - `--node`
 - `--bitwise`
 - `--nomen`
 - `--plusplus`
 - `--indent 4`
 - `--predef YUI,YUITest`

## What

1. require `http` module
2. implement my callback method, `onRequest`

## How

1. $ `node server.js`
2. open [http://localhost:8888](http://localhost:8888)

## Expected result

**node works.**

