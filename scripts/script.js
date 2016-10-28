(function(){

	var bartender = {
		answers : [],
		qTracker : 0,
		mix : [],
		currentQ : function(){
			var text =	$(".js-questions").text();
			return text
		},
		init : function(){
			this.nextQuestion();
			$(".yes").on('click', this.goThroughQuestions.bind(this));
			$(".no").on('click', this.alertMessage.bind(this));
		},
		reply : [
			"Matey, yer missin' out!",
			"That's the first!",
			"Shiver me timbers! really?... good thing ye drinkin' this!", 
			"Ar ye certain? This will put some hair on ye chest!",
			"The more for me belly!"
		],
		addToList : function(){
			//var currentQ = $(".js-questions").text();
			// Searching for the matched question object and pushing to answers array
			for (var i = 0; i < questions.length; i++){
				if (questions[i].question === this.currentQ()){
					bartender.answers.push(questions[i]);
				} 
			}
		},
		goThroughQuestions : function(e){
			e.preventDefault();
			if (this.qTracker < questions.length) {
				this.addToList();
				this.nextQuestion();
			} else {
				this.createDrink();
			}
		},
		createDrink : function(){
			if ( this.answers.length === 0){
			  	$('.js-mix').append("Leave this here place before me take ye to Davey Jones locker! ");	
			} else {

				this.answers.forEach(function(object){
					
					var flav = object.flavor;
					var ingred = pantry[flav].ingredient[Math.floor(Math.random() * 3)];
					bartender.mix.push(ingred);
				})
				console.log(bartender.mix)
				this.renderToHTML()
			}
		},
		renderToHTML : function(){
			this.mix.forEach(function(ing){
				$('.js-mix').append(ing);

			})
		},
		alertMessage : function(e){
			e.preventDefault();
			var replyBack =  this.reply[Math.floor(Math.random() * 5)];
			alert(replyBack)
			console.log(this.qTracker)
			if (this.qTracker < questions.length){
				this.nextQuestion();
			} else {
				bartender.createDrink();
			}
		},
		nextQuestion : function(){
			$('.js-questions').empty().append(questions[this.qTracker].question)
			this.qTracker++;
		},
		
	}



	/********************************
	questions constructor
	********************************/ 

	var Questions = function(flavor, question){
		this.question = question;
		this.flavor = flavor;
	}

	var questions = [

		new Questions("strong", "Do ye like yer drinks strong?"), 
		new Questions("salty", "Do ye like it with a salty tang?"), 
		new Questions("fruity", "Are ye one for a fruity finish?"), 
		new Questions("sweet", "Would ye like a bit of sweetness with yer poison?")
	]





	/******************************
	Ingredient contructor function
	******************************/

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

	bartender.init();


})();





