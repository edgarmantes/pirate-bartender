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
			questions.nextQuestion();
			$(".yes").on('click', this.goThroughQuestions.bind(this));
			$(".no").on('click', Message.alert);
		},
		reply : [
			"Matey, yer missin' out!",
			"That's the first!",
			"Shiver me timbers! really?... good thing ye drinkin' this!", 
			"Ar ye certain? This will put some hair on ye chest!",
			"The more for me belly!"
		],

		goThroughQuestions : function(e){
			e.preventDefault();
			questions.addToList();
			this.qTracker++;
			NextStep();
		},

		// renders created list of ingredients to DOM
		renderToHTML : function(){
			this.mix.forEach(function(ing){
				$('.js-mix').append(ing);

			})
		}, 


		// 
		createDrink : function(){
			if ( this.answers.length === 0){
			  	$('.js-mix').append("Leave this here place before me take ye to Davey Jones locker! ");	
			} else {

				this.answers.forEach(function(object){
					
					var flav = object.flavor;
					var ingred = Pantry.items[flav].ingredient[Math.floor(Math.random() * 3)];
					bartender.mix.push(ingred);
				})
				this.renderToHTML()
			}
		},
		
	};

	/***********************************************
	Alerts a message if you say 'No'
	***********************************************/
	var Message = {
		replyBack : bartender.reply[Math.floor(Math.random() * 5)],
		alert : function(e){
			e.preventDefault();
			alert(Message.replyBack);
			bartender.qTracker++;
			NextStep();
		}
	};


	/*******************************************************
	Goes to the next question or makes your a drink after all questions have been asked
	*******************************************************/
	var NextStep = function(){
		if (bartender.qTracker < questions.allQuestions.length){
				questions.nextQuestion();
		} else {
			bartender.createDrink();
		}
	};

	// pantry with list of ingredience with ad
	var Pantry = {
		items : {
			strong : new Ingredient(["Glug of rum", "slug of whisky", "splash of gin"]),
			salty : new Ingredient(["Olive on a stick", "salt-dusted rim", "rasher of bacon"]),
			fruity : new Ingredient(["Slice of orange", "dash of cassis", "cherry on top"]), 
			sweet: new Ingredient(["Sugar cube", "spoonful of honey", "splash of cola"]),
		},
		 
	};

	/******************************
	Ingredient contructor function
	******************************/


	function Ingredient(ingredient){
		this.ingredient = ingredient;
	}


	/********************************
	questions constructor
	********************************/ 

	function Question(flavor, question){
		this.question = question;
		this.flavor = flavor;
	}

	var	questions = {
		// Pushes the instance of the question object into the answers array
		addToList : function(){
			bartender.answers.push(questions.allQuestions[bartender.qTracker]);
		},
		//empties HTML tag and appends next question from the questions array
		nextQuestion : function(){
			$('.js-questions').empty().append(this.allQuestions[bartender.qTracker].question)
		},

		allQuestions : 	[

			new Question("strong", "Do ye like yer drinks strong?"), 
			new Question("salty", "Do ye like it with a salty tang?"), 
			new Question("fruity", "Are ye one for a fruity finish?"), 
			new Question("sweet", "Would ye like a bit of sweetness with yer poison?")
		]
	}

	bartender.init();


})();





