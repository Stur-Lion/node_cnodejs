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
    sayNum:Number,
    messageId:Number,
    avtor:String,
    thumbs:Object
})

/* 查找所有文章 */
articleSchema.statics.findMessage = function(data,callback){
    this.find(data,callback)
}

/* 添加文章 */
articleSchema.statics.addMessage = function(data,callback){
    this.create(data,callback)
}

/* 修改文章信息 */
articleSchema.statics.updateMessage = function(conditions,updates,callback){
    this.update(conditions,updates,callback)
}








module.exports = mongoose.model('messagelist',articleSchema)