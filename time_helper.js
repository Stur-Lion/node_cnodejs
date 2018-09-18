exports.formatTime = function(time){
	return time.toLocaleDateString() 
		+ ' '
		+ time.toTimeString().replace(/\sGM.*$/, '');
}