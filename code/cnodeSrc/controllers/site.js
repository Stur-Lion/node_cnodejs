var topicModel = require('../models/topic');
var _ = require('lodash');
var eventproxy = require('eventproxy');
var timeHelper = require('../time_helper');

exports.index = function(req, res){
	var page = parseInt(req.query.page) || 1;
	page = page > 0 ? page : 1;
	var tab = req.query.tab || 'all';
	var query = {};
	if(tab !== 'all'){
		query.tab = tab;
	}
	var ep = new eventproxy();
	var count = 1;
	var option = {skip: (page-1)*count, limit: count, sort: '-insertTime'};
	topicModel.getTopics(query, option, function(err, topics){
		topics = _.map(topics, function(topic){
			topic.timeStr = timeHelper.formatTime(topic.insertTime);
			return topic;
		})
		ep.emit('topic_data_ok', topics);
	});
	topicModel.count(query, function(err, allCount){
		var pageCount = Math.ceil(allCount/count);
		ep.emit('page_count_ok', pageCount);
	})
	ep.all('topic_data_ok', 'page_count_ok', function(topics, pageCount){
		res.render('index', {topics: topics, tab: tab, page: page, pageCount: pageCount});
	})
}