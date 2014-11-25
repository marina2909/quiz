$(document).ready(function(){
	
	var counter = 1;
	var correctCount = 0;
	var numberOfQuestions = 10;
	
	var dialogStart = $(".dialogStart");
	var dialogEnd = $(".dialogEnd");
	var dialogQuestion = $(".dialogQuestion");
	var options = dialogQuestion.find(".option");
	
	dialogStart.find("button").click(onStart);	
	options.click(onChoose);
	dialogQuestion.find("button").click(onNext);
	dialogEnd.find("button").click(onAgain); 
	
	function onStart(){
		dialogStart.hide();
		onNewGame();
	}
	
	function onAgain(){
		dialogEnd.hide();
		onNewGame();
	}
	
	function onNewGame(){
		counter = 1;
		correctCount = 0;
		showDialogQuestion();
		randomPermutate();	
	}

	function onChoose(){
		var correctId = questionData[counter].correct;
		var mark = $(".mark").addClass("mark"+this.id);
		if (this.id == correctId){
			correctCount++;
			mark.addClass("mark-correct");
		} else {
			mark.addClass("mark-wrong");		
		}
		
		var left = mark.position().left;
		var top = mark.position().top;
		
		options.prop("disabled", true);
	
		animate({
			from: [0, 0, left + 20, top + 18], 
			to: [40, 36, left, top], 
			duration: 300, 
			step: function(res){
				mark.css({width : res[0], height : res[1], left : res[2], top : res[3]});
			},
			animationType : 'elastic',
			onDone: function(){
				$("#"+correctId).addClass("correctAnswer");
			}
		});
		
		animate({
			from: [57, 114, 73, 156, 183, 112], 
			to: [243, 213, 189, 243, 213, 189], 
			duration: 250, 
			step: function(res){
				animateBackgroundImage(options, res);
			}, 
			onDone: function(){
				dialogQuestion.find("button").prop("disabled", false);
			}
		});
		
		animate({
			from: [209, 184, 163, 209, 184, 163], 
			to: [222, 139, 73, 166, 91, 30], 
			duration: 250, 
			step: function(res){
				animateBackgroundImage(dialogQuestion.find("button"), res);
			}
		});
	
	}

	function onNext(){
		if (counter >= numberOfQuestions){
			dialogQuestion.hide();
			dialogEnd.show();
			dialogEnd.find(".boxText").html(
				"Correct answers: " + correctCount + "</br>" +
				"Wrong answers: " + (counter - correctCount)
			);
		} else {
			counter++;
			showDialogQuestion();
		}
	}
	
	
	function randomPermutate(){
		for (i=0; i < questionData.length; i++){
			var random = Math.floor(Math.random() * i);
			var t = questionData[random];
			questionData[random] = questionData[i];
			questionData[i] = t;
		}
	}
	
	function animateBackgroundImage(elem, res){	
		var col1 = 'rgb('+parseInt(res[0])+', '+parseInt(res[1])+', '+parseInt(res[2])+')';
		var col2 = 'rgb('+parseInt(res[3])+', '+parseInt(res[4])+', '+parseInt(res[5])+')';
		elem.css({'background-image': "linear-gradient(to bottom," + col1 + " 0, " + col2 + " 100%)"});
	}
	
	function showDialogQuestion(){
	
		// write new question
		var questionRecord = questionData[counter];	
		$(".questionNo").html(counter+"/"+numberOfQuestions);
		dialogQuestion.find(".boxText").html(questionRecord.question);
		options.each(function(i){
			$(this).val(questionRecord.options[i]);
		});
		
		// remove previously set values
		$(".mark").removeClass("mark-correct mark-wrong mark0 mark1 mark2 mark3").removeAttr("style");
		options.removeClass("correctAnswer").prop("disabled", true);
		dialogQuestion.find("button").prop("disabled", true);
			
		// animate buttons
		animate({
			from: [243, 213, 189, 243, 213, 189], 
			to: [57, 114, 73, 156, 183, 112], 
			duration: 400, 
			step: function(res){
				animateBackgroundImage(options, res);
			},  
			onDone: function(){options.prop('disabled', false)}
		});
		
		animate({
			from: [222, 139, 73, 166, 91, 30], 
			to: [209, 184, 163, 209, 184, 163], 
			duration: 400, 
			step: function(res){
				animateBackgroundImage(dialogQuestion.find("button"), res);
			}
		});
		
		dialogQuestion.show();
	}
	

});



