Melissa's NodeJS Homework Notes
=============

Homework 3
-----------------------
- Demo: <http://hv1-vm03.search.pool.corp.tw1.yahoo.com:8888/guest>

	![Homework3](http://twiki.corp.yahoo.com/pub/Main/MeihuaYahoo/hw3.png)

- Install express & mustache ([Ref1](http://iamtherockstar.com/blog/2011/11/21/using-mustache-templates-express-apps/), [Ref2](http://blog.marchibbins.com/2012/08/21/building/))

	- Install express and create a new express app
	
			$ sudo ynpm install -g -registry https://registry.npmjs.org/ express
			$ express hello_express
			$ cd hello_express
			
	- Edit the dependencies in `package.json` and install mustache templates 
	
			$ vim package.json
				"dependencies": {
					"express": "3.x",
					"consolidate": "0.4.0",
					"mustache": "0.5.2"
				}
			$ ynpm install -d -registry https://registry.npmjs.org/ 
			$ ynpm ls
	
	- Edit `app.js` ([Express API](http://expressjs.com/api.html#app.engine))
	
			var engines = require('consolidate');
			app.engine('mustache', engines.mustache);
			app.set('view engine', 'mustache');
	
	- Create `views/index.mustache`
	
			<html>
				<head>
					<title>{{title}}</title>
				</head>
				<body>
					<h1>{{title}}</h1>
					<p>Welcome to {{title}}</p>
				</body>
			</html>	
			
	- Run `app.js`
			
			http://hv1-vm03.search.pool.corp.tw1.yahoo.com:3000/
			http://hv1-vm03.search.pool.corp.tw1.yahoo.com:3000/users

Homework 2
-----------------------
- Demo: <http://hv1-vm03.search.pool.corp.tw1.yahoo.com:8888/search?p=obama&c=5>

	![Homework2](http://twiki.corp.yahoo.com/pub/Main/MeihuaYahoo/Demo.png)

- Parse data by RESTful API and print results on browser. (Hint: [http.request](http://nodejs.org/docs/v0.5.2/api/http.html#http.request), [Ref](http://stackoverflow.com/questions/7238016/how-to-send-the-response-to-browser-fromm-http-request-in-node-js))
	- Use BOSS API to get web results 
	
		Ex: <http://gw01.bossgw-stag.search.sk1.yahoo.com:4080/ysearch/web?format=json&q=obama&count=5>

- (Optional) Try to store/access data in database. (Hint: [mysql](https://npmjs.org/package/mysql))
			
	-  Install `mysql_server`
	
			$ yinst install mysql_server
			$ yinst set mysql_config.port=3366
			$ yinst start mysql_server
			$ mysql -u root

	-  Install npm and mysql package
	
			$ yinst i ynpm -br test
			$ ynpm install -registry https://registry.npmjs.org/ mysql
			$ ynpm list
			
	-	Store search history into database and print 10 recent search terms on browser

- Pass all JavaScript code by JSLint

    - JSLint integrated with Vim ([jslint.vim](https://github.com/hallettj/jslint.vim), Ref: [JSLint Installation](http://twiki.corp.yahoo.com/view/AsiaSocialBlogEng/F2ESharingJSLint))
	
			$ git clone git://github.com/hallettj/jslint.vim.git
			
			# Copy ftplugin/ into ~/.vim/ftplugin/
			$ cp -r jslint.vim/ftplugin/ ~/.vim/ftplugin/
			
			# Activate filetype plugins
			$ echo "filetype plugin on" >> ~/.vimrc
			
			# Upgrade vim from version 7.0.237 to version 7.2.411
			$ yinst i vim7 -br current
			
			# Reload bash environment
			$ source ~/.bashrc
			
	- Add `~/.jslintrc`
	
			/*jslint browser: true, regexp: true, bitwise: true, nomen: true, plusplus: true, node: true, indent: 4, sloppy: true */
			/*global YUI, YUITest */
			/*vim: set ft=javascript: */

Homework 1 
-----------------------
- Setup NodeJS environment

		$ yinst i ynodejs06 -br current
		$ yinst set ynodejs06_core.file_accessdir=/
		$ yinst set ynodejs06_core.open_basedir=/
		$ node helloworld.js

- Say "Hello World" on browser

		$ node server.js

	Go to URL: <http://hv1-vm03.search.pool.corp.tw1.yahoo.com:8888/>

- Commit code to GitHub (Ref: [Fork A Repo](https://help.github.com/articles/fork-a-repo))

    - Fork project from: <https://git.corp.yahoo.com/clayliao/trainingNodejs>

    - Clone the fork of the repo into the current directory in local machine
 
			$ yinst i git -br test 
			$ git clone git@git.corp.yahoo.com:meihua/trainingNodejs.git

    - Add new files and commit to local repo
	
			$ cd trainingNodejs/homeworks/ 
			$ git add meihua/
			$ git status
			$ git commit -m 'Commit homework 1'

    - Push commits to your remote repo stored on GitHub

			$ git push origin master

    - Send Pull Request (Ref: [Using Pull Requests](https://help.github.com/articles/using-pull-requests))

- Pull in upstream changes

    - Assign the original repo to a remote called "upstream"

			$ git remote add upstream git@git.corp.yahoo.com:clayliao/trainingNodejs.git
			$ git remote show		
	
    - Fetch any new changes from the original repo
	
			$ git fetch upstream

    - Merge any changes fetched into your working files
	
			$ git merge upstream/master
