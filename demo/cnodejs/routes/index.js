var express = require('express');
var router = express.Router();


/* GET home page. */
/**/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* ×¢²áÒ³Ãæ */
router.get('/sign', function(req, res, next) {
  res.render('sign', {  });
});
/*×¢²áÇëÇó*/
router.post('/signin', function(req, res, next) {
  console.log(req.body);
});
/*µÇÂ¼Ò³Ãæ*/
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
/*µÇÂ¼ÇëÇó*/
router.post('/loginin', function(req, res, next) {

});

module.exports = router;
