exports.requireLogin = function(req, res, next){
	if(req.session.user){
		return next();
	}
	res.status(402);
	res.redirect('/signin');
}