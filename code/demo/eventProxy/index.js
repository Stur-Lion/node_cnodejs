var fs = require('fs');
var EventProxy = require('eventProxy');

var ep = new EventProxy();

/*fs.readFile('./file1.txt', 'utf8', function(err, content1){
	fs.readFile('./file2.txt', 'utf8', function(err, content2){
		fs.readFile('./file3.txt', 'utf8', function(err, content3){
			console.log(content1+content2+content3)
		});
	});
});*/

/*ep.all(['read_file1', 'read_file2', 'read_file3'], function(content1, content2, content3){
	console.log(content1+content2+content3)
});*/

/*ep.after('read_file', 3, function(contents){
	console.log(contents.join());
});

fs.readFile('./file1.txt', 'utf8', function(err, content1){
	ep.emit('read_file', content1+'ooxx');
})

fs.readFile('./file2.txt', 'utf8', function(err, content2){
	ep.emit('read_file', content2);
})

fs.readFile('./file3.txt', 'utf8', function(err, content3){
	ep.emit('read_file', content3);
})*/

/*ep.fail(function(err){
	console.log('this is fail function');
	console.log(err);
});

fs.readFile('./file4.txt', 'utf8', function(err, content){
	if(err){
		ep.throw(err);
		//ep.emit('error', err);
	}
})*/

ep.after('read_file', 1, function(contents){
	console.log(contents.join());
});

fs.readFile('./file1.txt', 'utf8', ep.done('read_file', function(content){
	return content+'ooxx';
}))