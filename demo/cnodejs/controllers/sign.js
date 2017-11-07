var common = require('./common.js');
var userModel = require('../models/user.js')
var messageModel = require('../models/message.js')

var index = 0

/*首页*/
exports.showIndex = function (req, res, next) {
    res.render('index', {  });
}

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
        console.log(index);
        formData.userId = index++
        console.log(formData);
        if(data.length==0){
            userModel.addUser(formData,function(err,data){
                if(err){
                    throw err
                    res.json({code:1,info:['注册失败'],data:[]})
                }
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
    var formData = req.body;
    userModel.getUserInfo({
        username:formData.username,
    }, function (err,data) {
        if(err){
            throw err
        }
        if(data.length==1){
            if(data[0].password==formData.password){
                req.session.username = formData.username;
                res.json({code:1,info:['登陆成功'],data:[]})
            }else{
                res.json({code:1,info:['密码错误'],data:[]})
            }
        }else if(data.length==0){
            res.json({code:1,info:['用户名不存在'],data:[]})
        }
    })
}

/* 登出 */
exports.loginout = function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
}

/* 发表文章 页面 */
exports.messagePage = function (req, res, next) {
    console.log(req.session.userId);
    res.render('addmessagePage',{ userId:req.session.username })
}

/* 发表文章 请求 */
exports.addmessagePage = function (req, res, next) {
    var adddata={}
    for(var k in req.body){
        adddata[k] = req.body[k]
    }
    adddata.goodZan = 0;
    adddata.seeNum = 0;
    adddata.sayNum = 0;

    messageModel.addMessage(adddata,function(err,data){
        if(err){
            throw err
            res.json({code:1,info:['添加失败'],data:[]})
        }
        if(typeof data=='object'){
            res.json({code:1,info:['添加成功'],data:[]})
        }

    })

}