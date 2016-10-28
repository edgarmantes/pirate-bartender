var answers = [];



// questions constructor

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



// Ingredient contructor function

var Ingredient = function(flavor, ingredient){
	this.ingredient = ingredient;
	this.flavor = flavor;
}


// pantry bank

var pantry = [
	
	new Ingredient("strong", "Glug of rum, slug of whisky, splash of gin"), 
	new Ingredient("salty", "Olive on a stick, salt-dusted rim, rasher of bacon"), 
	new Ingredient("fruity", "Slice of orange, dash of cassis, cherry on top"), 
	new Ingredient("sweet", "Sugar cube, spoonful of honey, splash of cola")

]


var addToList = function(e){
	e.preventDefault();
	var responseYea = $(this).text();
}

var alertMessage = function(e){
	e.preventDefault();
	var responseNay = $(this).text();

	var reply = [
		"Matey, yer missin' out!",
		"That's the first!",
		"Shiver me timbers! really?... good thing ye drinkin' this!", 
		"Ar ye certain? This will put some hair on ye chest!",
		"The more for me belly!"
	];

	var replyBack =  reply[Math.floor(Math.random() * 5)];
	alert(replyBack)
}

$(document).ready(function(){
	// User response listeners
	$(".yes").on('click', addToList);
	$(".no").on('click', alertMessage);


	// First questions loads
	$(".js-questions").html(questions[0].question);
})


//Math.floor(Math.random() * 3)