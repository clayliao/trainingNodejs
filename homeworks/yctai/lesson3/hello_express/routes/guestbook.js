exports.guestbook = function(req, res) {
    console.log('enter guestbook');
    res.render('guestbook.mustache', { 'message': 'Hello Worldddd', 'items':['aaaa','bbb','ccc']});
};

