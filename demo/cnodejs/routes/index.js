var express = require('express');
var router = express.Router();


/* GET home page. */
/**/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
