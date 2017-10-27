var express = require('express');
var router = express.Router();


/* GET home page. */
/*��ҳ*/
router.get('/', function(req, res, next) {
  res.render('index', {  });
});
/*�������� ҳ��*/
router.get('/newsign', function(req, res, next) {
  res.render('newsign', {  });
});
/*API ҳ��*/
router.get('/api', function(req, res, next) {
  res.render('api', {  });
});
/*���� ҳ��*/
router.get('/about', function(req, res, next) {
  res.render('about', {  });
});
/* ע��ҳ�� */
router.get('/sign', function(req, res, next) {
  res.render('sign', {  });
});
/*ע������*/
router.post('/signin', function(req, res, next) {
  console.log(req.body);
});
/*��¼ҳ��*/
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
/*��¼����*/
router.post('/loginin', function(req, res, next) {

});

module.exports = router;
