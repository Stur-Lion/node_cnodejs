var _ = require('lodash');

var user1 = {
	name: 'zhangsan',
	height: 180,
	weight: 120
};

var user2 = {
	name: 'lisi',
	height: 180,
	weight: 130
};

var user3 = {
	name: 'zhangsan',
	height: 180,
	weight: 131
};

var users = [user1, user2, user3];

//var result = _.find(users, {name: 'zhangsan', weight: 131});

//var result = _.findIndex(users, {name: 'zhangsan', weight: 131});

/*var result = _.filter(users, function(user){
	return user.weight > 125;
});*/

//var result = _.pluck(users, 'name');

/*var result = _.map(users, function(user){
	return {
		name: user.name,
		height: user.height * 2,
		age: 20
	};
});*/

//var result = _.remove(users, {name: 'zhangsan'});

//var result = _.uniq(users, 'name');

var result = _.chain(users).filter({name: 'zhangsan'}).uniq('name').pluck('weight').value();

console.log(result);