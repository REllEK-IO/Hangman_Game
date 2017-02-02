

//return index of each matching char/ lese returns -1 if char is not located
function replaceAt(index, character, string) {
    return string.substr(0, index) + character + string.substr(index+character.length);
}

var wins = 0;

var hangmanGame = {

	wordList: ["hello", "goodbye", "fuck"],
	userInput: '',
	//Controlls how many guesses the user has
	guess: 6,
	//Stores number of missed guesses
	miss: 0,
	,dispWord: '',
	//Contains word used for game
	word: wordList[Math.floor(Math.random() * wordList.length)],
	//Array stores what the user has guessed
	guesses: [],

	isInString: function(char, string) {
	    var count = 0;
	    var index = [];

	    for (var i = 0; i < string.length; i++) {
			if (string[i] === char) 
			{
				console.log(string[i]);
				index.push(i);
				count++;
			}	
		}

		if(count > 0)
		{
			return index;
		}
		else
		{
			miss++;
			index.push(-1);
			return index;
		}
	}

	//Displays current progress of word
	setupWord(): function{
		//Stores string to be converted into element node.
		var store;
		dispWord = '';

		for (var i = 0; i < word.length; i++) {
			//Fill check place with _
			dispWord += "_";
			for(var j = 0; j < guesses.length; j++){
				//If guesses[n] === to word at current index, replace _ with guess[n]
				if(word[i] === guesses[j]){
					dispWord = replaceAt(i, guesses[j], dispWord);
				}
			}
		}
		store = document.createTextNode(dispWord);
		document.getElementById('fill').innerHTML = dispWord;
	}

	//Displays the user guess to id guessed
	displayGuess: function(guess){
		var ref = document.getElementById('guessed');
		var textnode = document.createTextNode(guess);
		ref.appendChild(textnode);
	}

	displayChances: function(){
		var dispChances = "Guesses remaining:";

		for (var i = 0; i < miss; i++) {
			dispChances += " X";
		}
		for (var i = 0; i < (guess - miss); i++) {
			dispChances += " O";
		}
		document.getElementById("chances").innerHTML = dispChances;
		document.getElementById("hanging").src = "assets/images/stage_" + miss + ".png"; 
	}

	wasGuessed: function(check){
		if(/^[a-zA-Z]+$/.test(check) && check.length === 1)
		{
			for (var i = 0; i < guesses.length; i++) {
				if(guesses[i] === check){
					return true;
				}
			}
			guesses.push(check);
			return false;
		}
		return true;
	}

}

setupWord(word);		
document.onkeyup = function(event) {
var userGuess = event.key.toLowerCase();

if(!wasGuessed(userGuess)){
	displayGuess(userGuess);
	alert("The word is: " + word + "\n The guess was: " + userGuess + "\nThe guess was " + isInString(userGuess, word).toString());
	setupWord();
	displayChances();
}


};
//Check input letter string, if in sting display that letter
//If guess is in string, display fill with letters filled