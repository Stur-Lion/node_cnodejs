var express = require('express');
var router = express.Router();
var signController = require('../controllers/sign');
var topicController = require('../controllers/topic');
var siteController = require('../controllers/site');
var replyController = require('../controllers/reply');
var auth = require('../middlewares/auth');

//显示注册页面
router.get('/signup', signController.showSignup);

//提交注册信息
router.post('/signup', signController.signup);

//显示登陆页面
router.get('/signin', signController.showSignin);

//提交登陆信息
router.post('/signin', signController.signin);

//登出
router.get('/signout', signController.signout);

//显示发表话题页面
router.get('/topic/create', auth.requireLogin, topicController.showCreate);

//处理用户提交的话题信息
router.post('/topic/create', auth.requireLogin, topicController.create);

//显示主页
router.get('/', siteController.index);

router.get('/topic/:tid', topicController.detail);

//处理用户的评论
router.post('/reply/reply', auth.requireLogin, replyController.addReply);

//用户上传评论图片
router.post('/upload', auth.requireLogin, replyController.upload);

module.exports = router;
