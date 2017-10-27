var common = require('./common.js')
/*注册 页面 */
exports.showSignup = function (req, res, next) {
    res.render('sign', {  });
}

/*注册*/
exports.signup = function (req, res, next) {
    var formData = req.body
    var hasEmpty = false
    for(var k in formData){
        if(formData[k]==''){
            res.send({retcode:0,data:[],info:[k+'为空']})
        }
        var notice = common.validFrom(k,formData[k])
        console.log(notice);
        if(notice!==true){
            res.send({retcode:0,data:[],info:[notice]});
            break
        }
    }
}

/*登录 页面*/
exports.showLoginin = function (req, res, next) {
    res.render('login', {  });
}

/* 登录 */
exports.loginin = function (req, res, next) {

}

/* 登出 */
exports.signout = function (req, res, next) {

}