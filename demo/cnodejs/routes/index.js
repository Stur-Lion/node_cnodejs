var express = require('express');
var router = express.Router();
var signController = require('./../controllers/sign.js')


/* GET home page. */
/*首页*/
router.get('/', function(req, res, next) {
  res.render('index', {  });
});
/*新手入门 页面*/
router.get('/newsign', function(req, res, next) {
  res.render('newsign', {  });
});
/*API 页面*/
router.get('/api', function(req, res, next) {
  res.render('api', {  });
});
/*关于 页面*/
router.get('/about', function(req, res, next) {
  res.render('about', {  });
});
/* 注册页面 */
router.get('/sign', signController.showSignup);
/*注册请求*/
router.post('/signin', signController.signup);
/*登录页面*/
router.get('/login', signController.showLoginin);
/*登录请求*/
router.post('/loginin', signController.loginin);

module.exports = router;
