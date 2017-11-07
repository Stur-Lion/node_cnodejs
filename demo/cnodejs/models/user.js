var mongoose = require('../mongoose')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('连接成功');
});

/*用户*/
var userSchema = new mongoose.Schema({
    username:String,
    email: String,
    telephone:String,
    password:String,
    userId:Number
})



/* 查找用户 */
userSchema.statics.getUserInfo = function(data,callback){
    this.find(data,callback)
}
/* 添加用户 */
userSchema.statics.addUser = function(data,callback){
    this.create(data,callback)
}

module.exports = mongoose.model('userlist',userSchema)