var common = require('./common.js');
var userModel = require('../models/user.js')
var messageModel = require('../models/message.js');
var path = require('path');
var fs = require('fs');
var url = require('url');
var _ = require('../node_modules/lodash');

/*首页*/
exports.showIndex = function (req, res, next) {
    messageModel.findMessage({}, function (err,data) {
        if(err){
            throw err
        }
        var hashSort = url.parse(req.url,true).query;
        data = _.sortBy(data, function(item) {
            return -item.messageId;
        });
        if(hashSort.index==0){
            data = _.sortBy(data, function(item) {
                return -item.messageId;
            });
        }else if(hashSort.index==1){
            data = _.sortBy(data, function(item) {
                return -item.seeNum;
            });
        }else if(hashSort.index==2){

        }else if(hashSort.index==3){

        }else if(hashSort.index==4){

        }else if(hashSort.index==5){

        }
        res.render('index', {
            list:data,
            index:hashSort.index?hashSort.index:0
        });
    })
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
        formData.userId = data.length
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
                req.session.logo = data[0].avtor;
                res.json({code:1,info:['登陆成功'],data:[]})
            }else{
                res.json({code:2,info:['密码错误'],data:[]})
            }
        }else if(data.length==0){
            res.json({code:3,info:['用户名不存在'],data:[]})
        }
    })
}

/* 登出 */
exports.loginout = function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
}

/* 修改密码 页面*/
exports.changepsdPage = function (req, res, next) {
    res.render('changepsd', {  })
}

/* 修改密码 */
exports.changepsd = function (req, res, next) {
    console.log(req.body);
    userModel.getUserInfo({username:req.body.username},function(err,data){
        if(err){
            throw err
        }
        if(data.length>0){
            console.log(data);
            if(data[0].password==req.body.oldpassword){
                userModel.updateInformation({username:req.body.username},
                    {$set:{password:req.body.newpassword}}, function(err2,result){
                    console.log(result);
                    if(err2){
                        throw err2
                    }
                    if(result.nModified==1){
                        userModel.getUserInfo({username:req.body.username},function(err3,result1){
                            if(err3){
                                throw err3
                            }
                            if(result1[0].password==req.body.newpassword){
                                res.json({code:1,info:['修改密码成功'],data:{}})
                            }else{
                                res.json({code:0,info:['修改密码失败'],data:{}})
                            }
                        })
                    }
                })
            }else{
                res.json({code:0,info:['原密码错误'],data:{}})
            }
        }else{
            res.json({code:0,info:['无此用户'],data:{}})
        }
    })
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
    /*adddata.avtor*/
    userModel.getUserInfo({username:adddata.username},function(err,result){
        if(err){
            throw err
        }
        console.log(result);
        adddata.avtor = result[0].avtor;
        messageModel.findMessage({},function(err,data){
            adddata.messageId = data.length;
            messageModel.addMessage(adddata,function(err,data){
                if(err){
                    throw err
                    res.json({code:1,info:['添加失败'],data:[]})
                }
                if(typeof data=='object'){
                    res.json({code:1,info:['添加成功'],data:[]})
                }

            })
        })
    })



}

/* 文章详情 页面 */
exports.messageDetail = function (req, res, next) {
    var arg = url.parse(req.url, true).query;
    console.error(arg)
    messageModel.findMessage({messageId:arg.messageId},function(err,data){
        if(err){
            throw err
        }
        messageModel.updateMessage(
            {messageId:arg.messageId},
            {$set:{seeNum:++data[0].seeNum}},function(){
                userModel.getUserInfo({username:data[0].username},function(err,result){
                    if(err){
                        throw err
                    }
                    res.render('messageDetail', {
                        detail : data[0] ,
                        userInfor : result[0]
                    })
                })
            })
    })
}

/* 上传图片 */
exports.fileupload = function (req, res, next) {
    if (req.busboy) {
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            /*var newFilename = String((new Date()).getTime())+path.extname(filename);*/
            var newFilename = req.session.username+'.png'
            var filePath = __dirname + '/../public/avtor/'+ newFilename;
            var url = '/avtor/'+newFilename;

            file.pipe(fs.createWriteStream(filePath));
            file.on('end', function(){
                req.session.logo = url;
                userModel.updateInformation({username:req.session.username},{$set:{avtor:url}},function(err,data){
                    console.log(data);
                    res.json({success: true, url: url});
                })
            })
        });
        req.pipe(req.busboy);
    }
}

/* 点赞 */
exports.thumbsUp = function (req, res, next) {
    console.log(req.body);
}




















