function Question(question, options, correct){
	this.question = question;
	this.options = options;
	this.correct = correct;
}

var items = [new Question ("What is the second biggest country in the world?", ["Russia", "Canada", "China", "USA"], 1),
			new Question ("What is the Capital of Kazahstan?", ["Tashkent", "Sucre", "Astana", "Ashgabat"], 2),
			new Question ("Who is the fastest land animal?", ["Horse", "Cheetah", "Lion", "Kangaro"], 1),
			new Question ("What is the speed of sound?", ["340 m/s", "3.6 km/h", "1020 m/s", "32 m/s"], 0),
			new Question ("Which planet has the most moons?", ["Neptune", "Saturn", "Uranus", "Jupiter"], 3),
			new Question ("What is debut studio album by the American rock band Nirvana?", ["Come as you are", "Nevermind", "In Utero", "Bleach"], 3),
			new Question ("What film didn't win 11 Oscar awards?", ["The Return of the King ", "Ben-Hur", "Gone With The Wind", "Titanic"], 2),
			new Question ("How many players are on a baseball team?", ["7", "11", "9", "10"], 2),
			new Question ("What is the heaviest living reptile?", ["Aldabra giant tortoise", "Orinoco crocodile", "Nile crocodile", "Saltwater crocodile"], 3),
			new Question ("During what Chinese dinasty was paper invented?", ["Han", "Quin", "Xin", "Ming"], 0),
			new Question ("In which century did Western Roman Empire end?", ["5 AD", "4 BC", "7 AD", "6 AD"], 0),
			new Question ("In which century did Francesco Petrarca live?", ["11", "12", "13", "14"], 3),
			new Question ("Who was FIFA World Cup winner 1994?", ["Germany", "France", "Brasil", "Argentina"], 2),
			new Question ("What is the capital of Bangladesh?", ["Hanoi", "Islamabad", "Dhaka", "Kathmandu"], 2),
			new Question ("Where is La Guajira Desert?", ["In Columbia", "In Peru", "In Argentina", "In Chile"], 0)
			];
			
$(document).ready(function(){
	
	var state = {
		counter : 0,
		correctAnswers : 0,
		wrongAnswers : 0,
		clicked : 0
	};
	
	$(".start.command").click(function() {
	  onStart(state);
	});	
	
	$(".choose").click(function() {
	  onChoose(state, this.id);
	});
	
	$(".next.command").click(function() { 
		onNext(state);
	});
	
	$(".again.command").click(function() {
		onAgain(state);
	});

	setQuestions(state);
});

function setQuestions(state){
	var item = items[state.counter]
	
	$(".question").html(item.question);
	
	var choose = $(".choose");
	for (var i=0; i<4; i++){
		$(choose[i]).val(items[state.counter].options[i]);
	}
}

function onChoose(state, id){
	var choose = $(".choose");
	if (id == items[state.counter].correct){
		$(choose[id]).addClass("borderTrue");
		state.correctAnswers++;
	} else {
		$(choose[id]).addClass("borderFalse");
		$(choose[items[state.counter].correct]).addClass("borderTrue");
		state.wrongAnswers++;
	}
	choose.prop('disabled', true);
	state.clicked = 1;
}

function onStart(state){
	$(".dialogStart").addClass("hide");
}


function onNext(state){
	
	if (state.clicked == 0){
		return;
	}
	state.counter++;
	
	if (state.counter >= items.length){
		$(".dialogEnd").addClass("show");
		$(".dialogEndText").append("Correct answers: ")
						.append(state.correctAnswers)
						.append("</br>")
						.append("Wrong answers: ")
						.append(state.wrongAnswers);
		return;
	}
	
	setQuestions(state);
	enableOptions();
	state.clicked = 0;
}

function onAgain(state){
	state.counter = 0;
	state.correctAnswers = 0;
	state.wrongAnswers = 0;
	
	setQuestions(state);
	
	$(".dialogEnd").removeClass("show");
	$(".dialogEndText").empty();
	enableOptions();

}

function enableOptions(){
	$(".choose").removeClass("borderFalse borderTrue");
	$(".choose").prop('disabled', false);
}


