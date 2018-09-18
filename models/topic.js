var mongoose = require('../mongoose_helper').mongoose;

var TopicSchema = new mongoose.Schema({
	title: String,
	content: String,
	tab: String,
	username: String,
	insertTime: Date
});

TopicSchema.statics.addTopic = function(topic, callback){
	this.create(topic, callback);
};

TopicSchema.statics.getTopics = function(query, option, callback){
	this.find(query, {}, option, callback);
};

TopicSchema.statics.getTopic = function(topicId, callback){
	this.findOne({_id: topicId}, callback);
}

module.exports = mongoose.model('Topic', TopicSchema);