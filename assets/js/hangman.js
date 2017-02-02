var wordList = ["abnormal", "accursed", "amorphous", "antediluvian", "antique", "blaspheme", "cat", "charnel", "comprehension", "cyclopean", "dank", "decadent", "daemoniac", "effulgence", "eldritch",
"faint", "foetid", "fungus", "furtive", "gambrel", "gibbous", "gibber", "hideous", "immemorial", "indescribable", "loathe", "lurk", "madness", "manuscript", "mortal", "nameless", "noisome", "euclidean",
"proportion", "shunned", "singular", "squamous", "stench", "stygian", "swarthy", "tenebrous", "tentacle", "unmentionable"];
var userInput;
var guess = 6;
var miss = 0;
var dispWord = '';
//Contains word used for game
var word = wordList[Math.floor(Math.random() * wordList.length)];
var guesses = [];
var wins = 0;

// var audioSuccess = new Howl({
//   src: ['../sounds/success.wav']
// });


//return index of each matching char/ lese returns -1 if char is not located
function replaceAt(index, character, string) {
    return string.substr(0, index) + character + string.substr(index+character.length);
}

function isInString(char, string) {
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
		// audioSuccess.play();
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
function setupWord(){
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
function displayGuess(guess){
	var ref = document.getElementById('guessed');
	var textnode = document.createTextNode(guess);
	ref.appendChild(textnode);
}

function displayChances(){
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

function wasGuessed(check){
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

function gameContinue(){
	if(dispWord === word)
	{
		wins++;
		document.getElementById("wins").innerHTML = "Wins: " + wins;
		return false;
	}
	else if(miss === guess)
	{
		return false;
	}
	else{
		return true;
	}
}

function reset(){
	userInput = null;
	guess = 6;
	miss = 0;
	dispWord = '';
	word = wordList[Math.floor(Math.random() * wordList.length)];
	guesses = [];
	setupWord();
	displayChances();
	document.getElementById("guessed").innerHTML = "";
}

setupWord(word);
//	do{		
	document.onkeyup = function(event) {
	var userGuess = event.key.toLowerCase();
		
		if(!wasGuessed(userGuess)){
			// audioSuccess.play();
			isInString(userGuess, word);
			displayGuess(userGuess);
			setupWord();
			displayChances();
			if(!gameContinue()){
				reset();
			}
		}
	}
//}while(gameContinue());
