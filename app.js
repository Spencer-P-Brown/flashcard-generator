//require inquirer
var inquirer = require("inquirer");

//require constructors
var basicQuestion = require("./basicConstructor.js");
var clozeQuestion = require("./clozeConstructor.js");

//array of values to be passed through the basic card constructor
var basicCards = [
	new basicQuestion("In what comic book did Hawkeye first appear in?", "Tales of Suspense"),
	new basicQuestion("Warren K. Worthington III, aka Angel was originally part of what superhero team?", "The X-Men"),
	new basicQuestion("Where was Galactus born?", "Taa")
]

//array of values to be passed through the cloze deletion card constructor
var clozeCards = [
	new clozeQuestion("Wolverine's claws are made out of adamantium which also reinforces his skeleton", "adamantium"),
	new clozeQuestion("Bruce Banner was exposed to a fatal amount of gamma radiation, turning him into The Incredible Hulk", "gamma"),
	new clozeQuestion("Captain America's mighty sheild is made out vibranium, a rare metal that occurs naturally in Antarctica, \nthe fictional African nation of Wakanda and several other isolated regions around the world", "vibranium")
]

//current index of flashcards
var current = 0;

//function to choose game
function chooseGame(){
	inquirer.prompt([
	{
		type: "list",
		message: "choose your deck of flash cards",
		choices: ["Basic Cards", "Cloze Deletion Cards"],
		name: "userChoice"
	}
	]).then(function(choice){
		if(choice.userChoice == "Basic Cards" ){
			basicGame();
		}
		else if (choice.userChoice == "Cloze Deletion Cards"){
			clozeGame();
		}
	});
}
//both game functions are recursive and will cycle through until all the questions have been asked
//function for basic game 
function basicGame(){
	inquirer.prompt([
	{
		type: "list",
		message: basicCards[current].front,
		choices: ["See Answer!"],
		name: "seeAnswer"
	}
	]).then(function(gameChoice){
		if (gameChoice.seeAnswer == "See Answer!"){
			console.log(basicCards[current].back);
			console.log("------------------------- \n")
		}
		if (current < basicCards.length - 1){
			current++
			basicGame();
		}
		else {
			console.log("Game Over");
			inquirer.prompt([
			{
				type: "confirm",
				message: "Play again?",
				name: "playAgain"
			}
			]).then(function(replay){
				if(replay.playAgain){
					current = 0;
					chooseGame();
				}
				else{
					console.log("Goodbye!");
				}
			})
		}	
	});
}

//function for cloze deletion game
function clozeGame(){
	inquirer.prompt([
	{
		type: "input",
		message: clozeCards[current].partial,
		name: "answer",
	}	
	]).then(function(answers){
		if (answers.answer == clozeCards[current].cloze){
			console.log("\n" + clozeCards[current].cloze + " is Correct!");
			console.log("------------------------- \n")
		}
		else{
			console.log("I'm very sorry that is incorrect\n");
			console.log("The correct answer is " + clozeCards[current].cloze + "\n");
			console.log(clozeCards[current].fullText);
			console.log("------------------------- \n");
		}

		if (current < clozeCards.length -1){
			current ++;
			clozeGame();
		}
		else {
			console.log("Game Over");
			inquirer.prompt([
			{
				type: "confirm",
				message: "Play again?",
				name: "playAgain"
			}
			]).then(function(replay){
				if(replay.playAgain){
					current = 0;
					chooseGame();
				}
				else{
					console.log("Goodbye!");
				}
			})
		}
	});
}

chooseGame();

//things to do to make this a way better app
//   --add a # correct counter vs # incorrect counter
//   --when the game is over ask user if they want to replay and run the chooseGame() function
//   --user input to add flashcards
//   --user input to delete flashcards