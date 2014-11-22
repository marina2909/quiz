$(document).ready(function(){
	
	var state = {
		counter : 1,
		correctCount : 0
	};
	
	var numberOfQuestions = 10;
	var animationDuration = 300;
	var dialogStart = $(".dialogStart");
	var dialogEnd = $(".dialogEnd");
	var dialogQuestions = $(".dialogQuestions");
	var options = dialogQuestions.find(".option");
	
	var questions = q.slice(0);
	var animate = Animate();
	
	dialogStart.find("button").click(onStart);	
	
	options.click(onChoose);
	
	dialogQuestions.find("button").click(onNext);
	
	dialogEnd.find("button").click(onAgain); 
	
	
	function onStart(){
		randomPermutate();
		dialogStart.hide();
		setQuestions();
		dialogQuestions.find("button").prop("disabled", true);
		dialogQuestions.show();
	}


	function onChoose(){
		var correctId = questions[state.counter].correct;
		if (this.id == correctId){
			state.correctCount++;
			$("#res"+correctId).addClass("correctMark");
		} else {
			$("#res"+this.id).addClass("wrongMark");
			//animate.run([10, 9], [40, 36], 4000, animateMarker);
			
		}
	
		animate.run([57, 114, 73, 156, 183, 112], [243, 213, 189, 243, 213, 189], 0, animateOptions)
		animate.run([209, 184, 163, 209, 184, 163], [222, 139, 73, 166, 91, 30], 0, animateNext);
		
		options.prop("disabled", true);
		dialogQuestions.find("button").prop("disabled", false);
		
		$("#"+correctId).addClass("correctAnswer"); 
	}

	function onNext(){
		if (state.counter >= numberOfQuestions){
			dialogEnd.show();
			dialogEnd.find(".boxText").empty()
				.append("Correct answers: ")
				.append(state.correctCount)
				.append("</br>")
				.append("Wrong answers: ")
				.append(state.counter - state.correctCount);
			dialogQuestions.hide();
		} else {
			state.counter++;
			setQuestions();
			enableOptions();
			dialogQuestions.find("button").prop("disabled", true);
		}
		animate.run([243, 213, 189, 243, 213, 189], [57, 114, 73, 156, 183, 112], animationDuration, animateOptions)
		animate.run([222, 139, 73, 166, 91, 30], [209, 184, 163, 209, 184, 163],  animationDuration, animateNext);
	}
	

	function onAgain(){
		randomPermutate();
		state.counter = 0;
		state.correctCount = 0;
		
		setQuestions();
		dialogEnd.hide();
		dialogQuestions.show();
		enableOptions();
	}

	function enableOptions(){
		$(".true-false").removeClass("correctMark wrongMark");
		options.prop('disabled', false).removeClass("correctAnswer");
	}
	
	
	function setQuestions(){
		var q = questions[state.counter];
		
		dialogQuestions.find(".boxText").empty()
			.append('<div class="questionNo">'+state.counter+"/"+numberOfQuestions+"</div>")
			.append(q.question);
			

		
		options.each(function(i){
			$(this).val(q.options[i]);
		});
	}
	
	function randomPermutate(){
		for (i=0; i < questions.length; i++){
			var random = Math.floor(Math.random() * i);
			
			var t = questions[random];
			questions[random] = questions[i];
			questions[i] = t;
		}
	}
	
	function animateBackgroundImage(elem, res){	
		var col1 = 'rgb('+parseInt(res[0])+', '+parseInt(res[1])+', '+parseInt(res[2])+')';
		var col2 = 'rgb('+parseInt(res[3])+', '+parseInt(res[4])+', '+parseInt(res[5])+')';
		elem.css({ 'background-image': "linear-gradient(to bottom," + col1 + " 0, " + col2 +" 100%)"});
	}
	
	function animateOptions(res){
		animateBackgroundImage(options, res);
	}
	
	function animateNext(res){
		animateBackgroundImage(dialogQuestions.find("button"), res);
	}
	
	function animateMarker(res){
		$(".wrongMark").css({width : res[0], height : res[1]});
	}


});



