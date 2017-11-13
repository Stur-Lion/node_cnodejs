/**
 * Created by lion on 2017/10/25.
 */
function ajaxrequest(url,type,data,succ,error){
    $.ajax({
        url:url,
        type:type,
        dataType:'JSON',
        data:data,
        success:function(result){
            succ(result)
        },
        error:function(res){
            error(res)
        }
    })
}

function changeToObject(str) {
    var date = str.replace(/&quot;/g, '"');
    date = date.replace(/\"\{\"/g, '{"');
    date = date.replace(/\"\[\"/g, '["');
    date = date.replace(/\"\}\"/g, '"}');
    date = date.replace(/\"\]\"/g, '"]');
    return eval('(' + date + ')')
}

function alertTip (data,callback){
    jeBox.alert(data,{icon: 1}, function(index){
        jeBox.close(index);
        callback()
    });
}

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}