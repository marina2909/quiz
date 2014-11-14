$(document).ready(function(){
	
	var state = {
		counter : 0,
		correctAnswers : 0,
		wrongAnswers : 0,
		clicked : 0
	};
	
	var dialogEnd = $(".dialogEnd");
	
	$(".dialogStart button").click(function() {
		onStart(state);
	});	
	
	$(".choose").click(function() {
		onChoose(state, this.id);
	});
	
	$(".dialogQuestions button").click(function() { 
		onNext(state);
	});
	
	$(".dialogEnd button").click(function() {
		onAgain(state);
	}); 
	
});

function onStart(state){
	setQuestions(state.counter);
	$(".dialogStart").hide();
	$(".dialogQuestions").show();
}


function setQuestions(counter){
	var item = questions[counter];
	
	var dialogQuestions = $(".dialogQuestions");
	dialogQuestions.find(".boxText").html(item.question);
	
	var choose = dialogQuestions.find(".choose");
	for (var i=0; i<4; i++){
		$(choose[i]).val(questions[counter].options[i]);
	}
}

function onChoose(state, id){
	var choose = $(".choose");
	if (id == questions[state.counter].correct){
		$(choose[id]).addClass("borderTrue");
		state.correctAnswers++;
	} else {
		$(choose[id]).addClass("borderFalse");
		$(choose[questions[state.counter].correct]).addClass("borderTrue");
		state.wrongAnswers++;
	}
	choose.prop('disabled', true);
	choose.addClass("disChoose");
	$(".dialogQuestions button").removeClass("disableBoxButt");
	$(".dialogQuestions button").addClass("enableBoxButt");
	state.clicked = 1;
}


function onNext(state){
	
	if (state.clicked == 1){
		state.counter++;
		if (state.counter >= questions.length){
			var dialogEnd = $(".dialogEnd");
			dialogEnd.show();
			dialogEnd.find(".boxText").append("Correct answers: ")
							.append(state.correctAnswers)
							.append("</br>")
							.append("Wrong answers: ")
							.append(state.wrongAnswers);
			$(".dialogQuestions").hide();
		} else {
			setQuestions(state.counter);
			enableOptions();
			$(".choose").removeClass("disChoose");
			$(".dialogQuestions button").addClass("disableBoxButt");
			$(".dialogQuestions button").removeClass("enableBoxButt");	
			state.clicked = 0;	
		}
	}
}

function onAgain(state){
	state.counter = 0;
	state.correctAnswers = 0;
	state.wrongAnswers = 0;
	
	setQuestions(state.counter);
	
	var dialogEnd = $(".dialogEnd");
	dialogEnd.hide();
	dialogEnd.find(".boxText").empty();
	$(".dialogQuestions").show();
	enableOptions();
	$(".choose").removeClass("disChoose");
}

function enableOptions(){
	$(".dialogQuestions .choose").removeClass("borderFalse borderTrue").prop('disabled', false);
}


