var eventproxy = require('eventproxy');
var UserModel = require('../models/user');

exports.showSignup = function(req, res){
	res.render('sign/signup');
};

exports.signup = function(req, res){
	//获取用户数据
	var username = req.body.loginname;
	var pass = req.body.pass;
	var re_pass = req.body.re_pass;
	var email = req.body.email;
	var ep = new eventproxy();
	ep.on('info_error', function(msg){
		res.status(422);
		res.render('sign/signup', {error: msg});
	})
	//校验数据
	var hasEmptyInfo = [username, pass, re_pass, email].some(function(item){
		return item === '';
	});
	var isPassDiff = pass !== re_pass;

	if(hasEmptyInfo || isPassDiff){
		ep.emit('info_error', '注册信息错误');
		reutrn;
	}
	//保存到数据库
	UserModel.getUserBySignupInfo(username, email, function(err, users){
		if(err){
			ep.emit('info_error', '获取用户数据失败！');
			return;
		}
		if(users.length>0){
			ep.emit('info_error', '用户名或者邮箱被占用！');
			return;
		}
		UserModel.addUser({username: username, pass: pass, email: email}, function(err, result){
			if(result){
				res.render('sign/signup', {success: '恭喜你，注册成功'});
			}else{
				ep.emit('info_error', '注册失败！');
			}
		})
	})
};

exports.showSignin = function(req, res){
	res.render('sign/signin');
};

exports.signin = function(req, res){
	var username = req.body.name;
	var pass = req.body.pass;

	if(!username || !pass){
		res.status(422);
		return res.render('sign/signin', {error: '您填写的信息不完整'});
	}
	UserModel.getUser(username, pass, function(err, user){
		if(user){
			req.session.user = user;
			res.render('sign/signin', {success: '登陆成功'});
		}else{
			res.status(422);
			res.render('sign/signin', {error: '用户名或者密码错误！'});
		}
	})
};

exports.signout = function(req, res){
	req.session.destroy();
	res.redirect('/');
}