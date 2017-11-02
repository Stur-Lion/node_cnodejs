exports.validFrom = function(type,con){
    if(type=="email"){
        var Reg=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        var notice='邮箱格式不正确';
    }else if(type=="telephone"){
        var Reg=/^1(3|4|5|7|8)\d{9}$/;
        var notice='请输入正确手机号';
    }else if(type == "idnumber"){
        var Reg=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        var notice='请输入正确身份证';
    }else if(type == "bankcard"){
        var Reg=/\d{15}|\d{19}/;
        var notice='请输入正确的卡号';
    }
    if(Reg != undefined){
        var res = Reg.test(con);
        if(res){
            return res
        }
        return notice
    }
    return true
}

exports.session = function (data,res) {
    if(data==undefined&&data==''){
        res.render('/sign')
    }
}