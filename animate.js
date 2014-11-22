function Animate(){
	var interval;
	
	function run(from, to, duration, f){
		var interval = 0;
		var t0 = new Date();
		interval = setInterval(function(){ 
			var dT = new Date() - t0;
			var res = [];
			for	(i = 0; i < from.length; i++) {
				res.push(from[i] + (to[i] - from[i]) * dT / duration);
			}
			if (dT > duration){
				res = to;
				clearInterval(interval);
			}
			f(res);
		}, 50);
	}
	
	
	function stop(){
		clearInterval(interval);
	}
	
	return {
		run: run,
		stop: stop
	}
}