var answers = [];
var qTracker = 0;
var mix = [];

/********************************
questions constructor
********************************/ 

var Questions = function(flavor, question){
	this.question = question;
	this.flavor = flavor;
}


//  question bank

var questions = [

	new Questions("strong", "Do ye like yer drinks strong?"), 
	new Questions("salty", "Do ye like it with a salty tang?"), 
	new Questions("fruity", "Are ye one for a fruity finish?"), 
	new Questions("sweet", "Would ye like a bit of sweetness with yer poison?")
]


/*******************************
Ingredient contructor function
*******************************/

var Ingredient = function(ingredient){
	this.ingredient = ingredient;
}


// pantry bank

var pantry = {
	
	strong : new Ingredient(["Glug of rum", "slug of whisky", "splash of gin"]),
	salty : new Ingredient(["Olive on a stick", "salt-dusted rim", "rasher of bacon"]),
	fruity : new Ingredient(["Slice of orange", "dash of cassis", "cherry on top"]), 
	sweet: new Ingredient(["Sugar cube", "spoonful of honey", "splash of cola"]),

}

// Nay response will alert one of these responses
var reply = [
	"Matey, yer missin' out!",
	"That's the first!",
	"Shiver me timbers! really?... good thing ye drinkin' this!", 
	"Ar ye certain? This will put some hair on ye chest!",
	"The more for me belly!"
];

var addToList = function(e){
	var currentQ = $(".js-questions").text();
	// Searching for the matched question object and pushing to answers array
	for (var i = 0; i < questions.length; i++){
		if (questions[i].question === currentQ){
			answers.push(questions[i]);
		} 
	}
}

var goThroughQuestions = function(e){
	e.preventDefault();
	if (qTracker < questions.length) {
		addToList();
		nextQuestion();
	} else {
		createDrink();
	}
}

var createDrink = function(){
	if ( answers.length === 0){
	  	$('.js-mix').append("Leave this here place before me take ye to Davey Jones locker! ");	
	} else {

		answers.forEach(function(object){
			var flav = object.flavor;
			var ingred = pantry[flav].ingredient[Math.floor(Math.random() * 3)];
			mix.push(ingred);
		})
		renderToHTML()
	}
}



var renderToHTML = function(){
	mix.forEach(function(ing){
		$('.js-mix').append(ing);

	})
}

var alertMessage = function(e){
	e.preventDefault();
	var replyBack =  reply[Math.floor(Math.random() * 5)];
	alert(replyBack)
	if (qTracker < questions.length){
		nextQuestion();
	} else {
		createDrink();
	}
}

var nextQuestion = function(){
	$('.js-questions').empty().append(questions[qTracker].question)
	qTracker++;
}

$(document).ready(function(){
	nextQuestion();
	$(".yes").on('click', goThroughQuestions);
	$(".no").on('click', alertMessage);
})

