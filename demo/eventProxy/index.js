var http = require('http')
var fs = require('fs');
var EventProxy = require('eventproxy');
var ep = new EventProxy();


http.createServer(function(req,res){
    if(req.url=='/favicon.ico'){
        return
    }
    /*fs.readFile('./one.txt','utf8',function(err,one){
        fs.readFile('./one.txt','utf8',function(err,two){
            fs.readFile('./one.txt','utf8',function(err,three){
                console.log(one+'-'+two+'-'+three);
                res.end(one+'-'+two+'-'+three);
            })
        })
    })*/
    /*ep.all(['one','two','three'], function (content1,content2,content3) {
        res.end(content1+'-'+content2+'-'+content3);
    })
    fs.readFile('./one.txt','utf8',function(err,content1){
        ep.emit('one',content1)
    })
    fs.readFile('./two.txt','utf8',function(err,content2){
        ep.emit('two',content2)
    })
    fs.readFile('./three.txt','utf8',function(err,content3){
        ep.emit('three',content3)
    })
    ep.after('three',1,function(content){
        console.log(content);
    })*/
    /*fs.readFile('./four.txt','utf8',function(err,data){
        if(err){
            ep.thorw(err)
            //ep.emit('error',err)
        }
    })
    ep.fail(function(err){
        console.log(1);
    })*/

    ep.after('read_file',1,function(contents){
        console.log(contents);
    })
    fs.readFile('./one.txt','utf8',ep.done('read_file',function (content) {
        console.log(content);
        res.end('');
    }))

}).listen(3000,'172.17.16.238')




