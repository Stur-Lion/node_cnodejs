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