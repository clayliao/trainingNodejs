
/*
 * GET home page.
 */


url = require('url')

exports.index = function(req, res){
  res.render('index', { title: 'Homework3', postmsg: false });

/*  res.render('index', { 
  locals: {
    title: "project",
    project:"express use mustache."

    }, 
    partials: {
      heading: '<h1>{{prject}}</h1>'
   }
 });*/

};
