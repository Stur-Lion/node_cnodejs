var mongoose = require('../mongoose')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('连接成功2');
});

/*说说*/
var articleSchema = new mongoose.Schema({
    username:String,
    title:String,
    content:String,
    time:String,
    goodZan:Number,
    seeNum:Number,
    sayNum:Number
})

/* 查找所有文章 */
articleSchema.statics.findMessage = function(data,callback){
    this.find(data,callback)
}

/* 添加文章 */
articleSchema.statics.addMessage = function(data,callback){
    this.create(data,callback)
}








module.exports = mongoose.model('messagelist',articleSchema)