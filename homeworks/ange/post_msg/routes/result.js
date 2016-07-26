
/*
 * GET Result Page 
 */

var fs = require("fs");

exports.result = function(req, res){
   //res.send(req.body.msg);
  
  if(req.files !== undefined) {
    var path = './public/images/' + req.files.image.name;    
    fs.readFile(req.files.image.path, function(err, data) {
      if (err) {throw err; }
      fs.writeFile(path, data, function(err) {
        if (err) {throw err; }
        res.render('index', { title: "Homework 3 Image Result", image: req.files.image.name, postmsg: false, postimg: true});
      });
    });
  }
  else {  
   res.render('index', { title: "Homework 3 Message Result", result: req.body.msg, postmsg: true, postimg: false});
  }

};
