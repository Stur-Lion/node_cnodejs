var express = require('express');
var router = express.Router();


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
router.get('/sign', function(req, res, next) {
  res.render('sign', {  });
});
/*注册请求*/
router.post('/signin', function(req, res, next) {
  console.log(req.body);
});
/*登录页面*/
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
/*登录请求*/
router.post('/loginin', function(req, res, next) {

});

module.exports = router;
