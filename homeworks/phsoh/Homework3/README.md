# Readme #

## Homework 3

### Usage

> node index.js

Default port: `3000`

### Dependencies

To use `mustache` view engine in `express3` framework, modules listed below are required:
`mustache`, `consolidate`, `swig`

### Modification on `express3` framework

1. Install `express`
> $ sudo npm install -g express

2. Generate `express` app - `hello_world`
> $ express hello_world

3. Edit `package.json`
> $ vim hello_world/package.json

4. Include `consolidate`, `swig` and `mustache` into dependencies
> ....
> "dependencies": {
> "express": "3.0.0",
> "mustache": "*",
> "swig": "*",
> "consolidate": "*"
> }
> ....

5. Download required modules
> $ cd hello_world && npm install

6. Modified `express` settings in `app.js`
> var cons = require('consolidate');
> ....
> app.configure( .......
>   ....
>   app.engine('html', cons.swig);
>   app.set('view engine', 'html');
>   ....

7. Create `mustache` view template, e.g. `views/index.html`
> <div>Welcome to {{title}}</div>

8. start `app`
> $ node app


### Resources

To know more, click the links below:
* [mustache]
* [consolidate]
* [swig]]

[mustache]: http://mustache.github.com/
[consolidate]: https://github.com/visionmedia/consolidate.js
[swig]: http://paularmstrong.github.com/swig/

