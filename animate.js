 /* 
	Animate is an object that contains function run that is used for all animations in game.
	'run' can accept any function that will be executed for every frame. It also accepts 'onDone' callback function that will be executed after animation is done.  
	In 'run' you can also define animation type. Currently possible types are 'linear' and 'elastic' but it can be easily extended to accept more animation types. 
 */

function Animate(){
	function run(from, to, duration, f, animationType, onDone){
		var t0 = new Date();
		var res = [];
		f(from);
		var interval = setInterval(function(){ 
			var t = new Date() - t0;
			for	(i = 0; i < from.length; i++) {
				var x = t / duration;
				var y = x; // linear
				if (animationType == 'elastic'){
					var y = 1.417 * x + 6.875 * x * x - 7.292 * x * x * x;
				}	
				res[i] = (to[i] - from[i]) * y + from[i];
			}
			if (t > duration){
				res = to;
				clearInterval(interval);
				if (onDone) onDone();
			}
			f(res);
		}, 25);
	}
	
	
	return {
		run: run
	}
}