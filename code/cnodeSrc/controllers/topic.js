var validator = require('validator');
var TopicModel = require('../models/topic');
var eventproxy = require('eventproxy');
var timeHelper = require('../time_helper');
var ReplyModel = require('../models/reply');
var _ = require('lodash');

exports.showCreate = function(req, res){
	res.render('topic/create');
};

exports.create = function(req, res){
	var title = validator.trim(req.body.title);
	var tab = validator.trim(req.body.tab);
	var content = validator.trim(req.body.t_content);

	var hasEmptyInfo = [title, tab, content].some(function(item){
		return item === '';
	})
	if(hasEmptyInfo){
		res.status(422);
		return res.render('topic/create', {error: '您填写的信息不完整'});
	}
	var topicData = {
		title: title,
		content: content,
		tab: tab,
		username: req.session.user.username,
		insertTime: Date.now()
	};
	TopicModel.addTopic(topicData, function(err, result){
		return res.render('topic/create', {success: '发表话题成功！'});
	})
};

exports.detail = function(req, res){
	var topicId = req.params.tid;
	var ep = new eventproxy();

	TopicModel.getTopic(topicId, function(err, topic){
		topic.timeStr = timeHelper.formatTime(topic.insertTime);
		ep.emit('topic_data_ok', topic);
	});
	ReplyModel.count({topicId: topicId}, function(err, count){
		ep.emit('reply_count_ok', count);
	});
	
	ReplyModel.getReplys(topicId, function(err, replys){
		replys = _.map(replys, function(reply){
			reply.timeStr = timeHelper.formatTime(reply.insertTime);
			return reply;
		});
		ep.emit('replys_data_ok', replys)
	});

	ep.all('topic_data_ok', 'reply_count_ok', 'replys_data_ok', function(topic, count, replys){
		res.render('topic/detail', {topic: topic, count: count, replys:replys});
	})
}