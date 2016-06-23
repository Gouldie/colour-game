var squares = document.querySelectorAll(".square");
var rgbDisplay = document.querySelector("#rgbDisplay");
var button = document.querySelector("#refresh");
var resultText = document.querySelector("#result");
var h1 = document.querySelector("h1");
var header = document.querySelector("#header");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

var gameOver = false;
var colours = [];
var targetColour;
var hardMode = true;

loadHardMode();

easyBtn.addEventListener("click", function() {
	easyBtn.classList.add("selected");
	hardBtn.classList.remove("selected");
	loadEasyMode();
	hardMode = false;
});

hardBtn.addEventListener("click", function() {
	easyBtn.classList.remove("selected");
	hardBtn.classList.add("selected");
	loadHardMode();
	hardMode = true;
});

button.addEventListener("click", function() {
	if (hardMode) {
		loadHardMode();
	}
	else
	{
		loadEasyMode();
	}
});

for (var i = 0; i < squares.length; i++)
{
	squares[i].addEventListener("click", function(){
		if (gameOver == false)
		{
			var currentGuess = this.style.backgroundColor;
			console.log(currentGuess, targetColour);

			if (currentGuess === targetColour)
			{
				resultText.textContent = "Correct!";
				button.textContent = "Play Again?"
				gameOver = true;
				allSquaresColour();
			}
			else
			{
				resultText.textContent = "Try Again";
				this.style.backgroundColor = "#232323";
			}
		}
	});
}

function allSquaresColour()
{
	for (var i = 0; i < squares.length; i++)
	{
		squares[i].style.backgroundColor = targetColour;
	}
	h1.style.backgroundColor = targetColour;
}

function randomColour()
{
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var colour = "rgb(" + r + ", " + g + ", " + b + ")";
	return colour;
}

function fillArray(size)
{
	for (var i = 0; i < size; i++)
	{
		colours[i] = randomColour();
	}
}

function fillSquares()
{
	for (var i = 0; i < colours.length; i++)
	{
		squares[i].style.backgroundColor = colours[i];
	}
}

function setTargetColour()
{
	targetColour = colours[Math.floor(Math.random() * colours.length)];
	rgbDisplay.textContent = targetColour;
}

function loadHardMode()
{
	fillArray(6);
	fillSquares();
	setTargetColour();
	setVisuals();
	
	for (var i = 0; i < squares.length; i++)
	{
		squares[i].classList.remove("hidden");
	}
}

function loadEasyMode()
{
	colours = [];
	fillArray(3);
	fillSquares();
	setTargetColour();
	setVisuals();

	for (var i = 3; i < squares.length; i++)
	{
		squares[i].classList.add("hidden");
	}
}

function setVisuals()
{
	resultText.textContent = "";
	h1.style.backgroundColor = "steelblue";
	header.style.backgroundColor = "white";
	gameOver = false;
	button.textContent = "New Colours";
}