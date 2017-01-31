var wordList = ["hello", "goodbye", "fuck"];
var userInput;
var guess = 5;
var dispWord = '';
var word = wordList[Math.floor(Math.random() * wordList.length)];
var guesses = [];

//return index of each matching char/ lese returns -1 if char is not located
function isInString(char, string) {
    var count = 0;
    var index = [];

    for (var i = 0; i < string.length; i++) {
		if (string.charAt(i) === char) 
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
		index.push(-1);
		return index;
	}
}

function setupWord(string){
	var store;
	for (var i = 0; i < word.length; i++) {
		dispWord = dispWord + "_";
	}
	store = document.createTextNode(dispWord);
	document.getElementById('fill').appendChild(store);
}

function displayWord(){
	alert(dispWord);
	var disp = '';
	for (var i = 0; i < word.length; i++) {
		for(var j = 0; j < guesses.length; j++){
			if(word.charAt(j) === guesses[i]){
				disp = disp + guesses[i];
			}
		}
	}
}

//Displays the user guess to id guessed
function displayGuess(guess){
	var ref = document.getElementById('guessed');
	var textnode = document.createTextNode(guess);
	ref.appendChild(textnode);
}

function wasGuessed(check){
	for (var i = 0; i < guesses.length; i++) {
		if(guesses[i] === check){
			return true;
		}
	}
	guesses.push(check);
	return false;
}

setupWord(word);		
document.onkeyup = function(event) {
var userGuess = event.key;
if(!wasGuessed(userGuess)){
	displayGuess(userGuess);
	alert("The word is: " + word + "\n The guess was: " + userGuess + "\nThe guess was " + isInString(userGuess, word).toString());
}




};
//Check input letter string, if in sting display that letter
//If guess is in string, display fill with letters filled