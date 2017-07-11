window.onload = function() { 
	var teams = ["falcons", "giants", "redskins", "eagles", "patriots", "cowboys", "packers", "seahawks", "lions", "buccaneers", "saints", "panthers", "chiefs", "ravens", "cardinals"];

	var randomTeam = teams[Math.floor(Math.random() * teams.length)];

	var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

	//Set random word to underscores so player doesn't see the word
	var answerArray = [randomTeam];
	for (var i = 0; i < randomTeam.length; i++) {
	   answerArray[i] ="_";
	}
	//Create underscores in place of letters
	var blanks = document.getElementById("hiddenword");
	blanks.innerHTML = answerArray.join(" ");

	//Set var for the number of guesses
	var guessLeft = 12;
	var guessRemain = document.getElementById("guessremain");
	guessRemain.innerHTML = guessLeft;

	//Create var to keep track of letters remianing
	var remainingLetters = randomTeam.length;

	//Create var for storing already selected keys
	var guesses = [];
	var myDiv = document.getElementById("guessalready");
	var newDiv = document.createElement("div");
	myDiv.appendChild(newDiv);

	var audio = new Audio("assets/images/nfl song.mp3");
	audio.play();

	//On key press run the game loop
	document.onkeypress = function(event) {
		guesses.push(event.key);

		newDiv.innerHTML = "";

		guesses.forEach(function(key) {
			newDiv.innerHTML += key + ", ";
		});

		//The Game Loop!!
		while (guessLeft > 0 && remainingLetters > 0) {
			//Get a guess from the player
			playerGuess = event.key;
			if (playerGuess === null || playerGuess === undefined) {
				//exit game loop
				alert("You must pick a letter to play.")
				break;
			} 
			else if (playerGuess.length !== 1) {
				//Alert player to enter just one letter
				alert("Please pick just one letter.");
				break;
			} 
			else {
				//Update game state with guess
				if (randomTeam.includes(playerGuess)) {
					alert("There is an: " + playerGuess)
					var k = randomTeam.indexOf(playerGuess);
					answerArray[k] = playerGuess;
					var l = randomTeam.lastIndexOf(playerGuess);
					answerArray[l] = playerGuess;
					document.getElementById("hiddenword").innerHTML = answerArray.join(" ");
					if (l > k) {
						remainingLetters-=2;
						break;
					}
					else {
						remainingLetters--;
						break;
					}
				}
				else {
					guessLeft--;
					document.getElementById("guessremain").innerHTML = guessLeft;
					break;
				}
			}
		}
	if (remainingLetters === 0) {
		alert("YOU WON!");
		audio.pause();
		var newAudio = new Audio("assets/images/You may win this time.mp3");
		newAudio.play();
		setTimeout(myFunction, 8000);
		function myFunction() {
			location.reload();
		}
	}
	else if (guessLeft === 0) {
		alert("YOU LOST!");
		audio.pause();
		var newAudio = new Audio("assets/images/herm2.mp3");
		newAudio.play();
		setTimeout(myFunction, 17000);
		function myFunction() {
			location.reload();
		}
	}
	else {
		
	}
	}
}
