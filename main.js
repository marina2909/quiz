var items = [new Question ("What is capital of Croatia?", ["Zadar", "Zagreb", "Osijek", "Rijeka"], 1),
			new Question ("What is capital of Kenya?", ["Nairobi", "Sucre", "Seattle", "Miami"], 0),
			new Question ("What is capital of Bolivia?", ["Caracas", "Belgrade", "Brasilia", "Sucre"], 3)
			];
			
			
function Question(question, options, correct){
	this.question = question;
	this.options = options;
	this.correct = correct;
}
			
var counter = 0;			

function onLoad(){
	counter = 0;
	$(".next").click(function() {
	  onNext();
	});
	
	$(".choose").click(function() {
	  onChoose(this.id);
	});
	setQuestions();
}

function setQuestions(){
	var item = items[counter]
	
	$(".question").html(item.question);
	
	var choose = $(".choose");
	for (var i=0; i<5; i++){
		$(choose[i]).val(items[counter].options[i]);
	}
}

function onNext(){
	counter = counter + 1;
	setQuestions();
}

function onChoose(id){
	if (id == items[counter].correct){
		$($(".choose")[id]).addClass("borderGreen");
	}
}
