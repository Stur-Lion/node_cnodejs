var formidable = require('../models/file.js');


/* 上传*/
router.post('/file/uploading', function(req, res, next){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log(files);
    res.json({})
  });
});

module.exports = router;