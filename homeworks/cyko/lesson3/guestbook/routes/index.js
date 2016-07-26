var url=require('url');
var qs=require('querystring');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.api = function(req, res) {
	now=new Date();
	now_str=now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+': ';

	msg=now_str+req.body.msg;
	old_msg=req.body.old_msg;
	if (old_msg=='')
		old_msg=msg;
	else
		old_msg+="<br>"+msg;

	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write(old_msg);
	res.end();
}
