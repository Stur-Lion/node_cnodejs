var express = require('express');
var router = express.Router();
var signController = require('./../controllers/sign.js')


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
router.get('/sign', signController.showSignup);
/*ע������*/
router.post('/signin', signController.signup);
/*��¼ҳ��*/
router.get('/login', signController.showLoginin);
/*��¼����*/
router.post('/loginin', signController.loginin);

module.exports = router;
