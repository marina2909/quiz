/** Function 'animate' is used for all
	animations in the game. 'animate' can accept any function that will be
	executed on every frame. It also accepts 'onDone' callback function that
	will be executed after animation is done. In 'animate', you can also define
	animation type. Currently possible types are 'linear' and 'elastic', but
	it can be easily extended to accept more animation types.
*/
function animate(o){
	var t0 = new Date();
	var res = [];
	o.step(o.from);
	var interval = setInterval(function(){ 
		var t = new Date() - t0;
		if (t > o.duration){
			o.step(o.to);
			clearInterval(interval);
			if (o.onDone) o.onDone();
		} else {
			var x = t / o.duration;
			for	(var i = 0; i < o.from.length; i++) {
				var y = x; // linear
				if (o.animationType == 'elastic'){
					y = 1.417*x + 6.875*x*x - 7.292*x*x*x;
				}
				res[i] = (o.to[i] - o.from[i]) * y + o.from[i];
			}
			o.step(res);
		}
	}, 25);
}