var lodash = require('lodash');

var user1={
    name:'zhansan',
    age:18,
    weight:120
}
var user2={
    name:'lisi',
    age:16,
    weight:130
}
var user3={
    name:'lisi',
    age:16,
    weight:140
}
var user=[user1,user2,user3]


/*var result = lodash.find(user,{name:'lisi'});
var index = lodash.findIndex(user,{name:'lisi',weight:140});
var results= lodash.filter(user,{name:'lisi'});
var results2 = lodash.filter(user,function(user){
    if(user.weight>125){
        return user
    }
})
var map = lodash.map(user,function(user){
    return {
        name:user.name,
        age:20,
        weight:140
    }
})*/

//console.log(result);
//console.log(index);
//console.log(results);
//console.log(results2);
//console.log(map);

/*lodash.remove(map,{name:'lisi'})
console.log(map);*/

/*var data = lodash.uniqBy(map,'name')
console.log(data);*/

var chain = lodash.chain(user).filter({name:'lisi'}).uniqBy('name').value()
console.log(chain);


//console.log(user);