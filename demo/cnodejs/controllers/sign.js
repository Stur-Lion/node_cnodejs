var common = require('./common.js');
var userModel = require('../models/user.js')

/*注册 页面 */
exports.showSignup = function (req, res, next) {
    res.render('sign', {  });
}

/*注册*/
exports.signup = function (req, res, next) {
    var formData = req.body;
    //检查格式是否正确
    for(var k in formData){
        if(formData[k]==''){
            res.send({retcode:0,data:[],info:[k+'为空']})
        }
        var notice = common.validFrom(k,formData[k])
        if(notice!==true){
            res.send({retcode:0,data:[],info:[notice]});
            break
        }
    }
    //查重入库
    userModel.getUserInfo({
        username:formData.username,
    },function(err,data){
        if(err){
            throw err
        }
        console.log(data);
        if(data.length==0){
            userModel.addUser(formData,function(err,data){
                if(err){
                    throw err
                    res.json({code:1,info:['注册失败'],data:[]})
                }
                console.log(data);
                if(typeof data=='object'){
                    res.json({code:1,info:['注册成功'],data:[]})
                }
            })
        }else{
            res.json({code:1,info:['用户名已被使用'],data:[]})
        }
    })
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