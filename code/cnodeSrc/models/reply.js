var mongoose = require('../mongoose_helper').mongoose;

var ReplySchema = new mongoose.Schema({
	topicId: String,
	content: String,
	username: String,
	insertTime: Date
});

ReplySchema.statics.addReply = function(reply, callback){
	this.create(reply, callback);
};

ReplySchema.statics.getReplys = function(topicId, callback){
	this.find({topicId: topicId}, callback);
};

module.exports = mongoose.model('Reply', ReplySchema);