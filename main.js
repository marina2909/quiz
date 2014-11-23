$(document).ready(function(){
	
	var counter = 1;
	var correctCount = 0;
	var numberOfQuestions = 10;
	
	var dialogStart = $(".dialogStart");
	var dialogEnd = $(".dialogEnd");
	var dialogQuestions = $(".dialogQuestions");
	var options = dialogQuestions.find(".option");
	
	var questions = q.slice(0);
	
	dialogStart.find("button").click(onStart);	
	options.click(onChoose);
	dialogQuestions.find("button").click(onNext);
	dialogEnd.find("button").click(onAgain); 
	var animate = Animate();
	
	function onStart(){
		randomPermutate();
		dialogStart.hide();
		setQuestion();
		dialogQuestions.find("button").prop("disabled", true);
		dialogQuestions.show();
	}


	function onChoose(){
		var correctId = questions[counter].correct;
		var mark = $(".mark")
		mark.addClass("mark"+this.id);
		if (this.id == correctId){
			correctCount++;
			mark.addClass("mark-correct");
		} else {
			mark.addClass("mark-wrong");		
		}
		
		var left = mark.position().left;
		var top = mark.position().top;
		
		animate.run([0, 0, left + 20, top + 18], [40, 36, left, top], 300, animateMarker, 'elastic', function(){$("#"+correctId).addClass("correctAnswer");});
		animate.run([57, 114, 73, 156, 183, 112], [243, 213, 189, 243, 213, 189], 250, animateOptions, 'linear', 	function(){dialogQuestions.find("button").prop("disabled", false);});
		
		animate.run([209, 184, 163, 209, 184, 163], [222, 139, 73, 166, 91, 30], 250, animateNext, 'linear');
		
		options.prop("disabled", true); 
	}

	function onNext(){
		if (counter >= numberOfQuestions){
			dialogEnd.show();
			dialogEnd.find(".boxText").empty()
				.append("Correct answers: ")
				.append(correctCount)
				.append("</br>")
				.append("Wrong answers: ")
				.append(counter - correctCount);
			dialogQuestions.hide();
		} else {
			counter++;
			setQuestion();
			setOptionsToDefault();
			
			animate.run([243, 213, 189, 243, 213, 189], [57, 114, 73, 156, 183, 112], 500, animateOptions, 'linear', function(){options.prop('disabled', false)});
			animate.run([222, 139, 73, 166, 91, 30], [209, 184, 163, 209, 184, 163],  500, animateNext, 'linear');
		}
	}
	
	function onAgain(){
		counter = 1;
		correctCount = 0;
		randomPermutate();
		setQuestion();
		setOptionsToDefault();
		dialogEnd.hide();
		dialogQuestions.show();
		
		animate.run([243, 213, 189, 243, 213, 189], [57, 114, 73, 156, 183, 112], 500, animateOptions, 'linear', function(){options.prop('disabled', false)});
		animate.run([222, 139, 73, 166, 91, 30], [209, 184, 163, 209, 184, 163],  500, animateNext, 'linear');
	}

	function setOptionsToDefault(){
		$(".mark").removeClass("mark-correct mark-wrong mark0 mark1 mark2 mark3").removeAttr("style");;
		options.removeClass("correctAnswer");
		dialogQuestions.find("button").prop("disabled", true);
	}
	
	
	function setQuestion(){
		var q = questions[counter];
		
		dialogQuestions.find(".boxText").empty()
			.append('<div class="questionNo">' + counter+"/"+numberOfQuestions+"</div>")
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
		$(".mark").css({width : res[0], height : res[1], left : res[2], top : res[3]});
	}


});



