/* ========================= Variables ==============================*/

var onePlayerButton = document.getElementById('one-player');
var twoPlayerButton = document.getElementById('two-players');

var question1 = document.getElementById('question1');
var question2 = document.getElementById('question2');
var backButtons = document.querySelectorAll('.back-button');

var onePlayerX = document.getElementById('onePlayerX');
var onePlayerO = document.getElementById('onePlayerO');

var twoPlayersX = document.getElementById('twoPlayersX');
var twoPlayersO = document.getElementById('twoPlayersO');

var gameBoard = document.getElementById('game-board');
var displayTurn = document.getElementById('display-turn');

var player2Span = document.getElementById('player2-span');
var player2 = document.getElementById('player2');
var player1 = document.getElementById('player1');


var player1Marker = document.getElementById('player1-marker');
var player2Marker = document.getElementById('player2-marker');

var firstTurn = document.getElementById('who-goes-first-button');
var whoGoesFirst = document.getElementById('who-goes-first');
var firstTurnPrompt = document.getElementById('first-turn-prompt');
var firstTurnResult = document.getElementById('first-turn-result');

var quitGameDiv = document.getElementById('quit-game');
var quitGameButton = document.getElementById('quit-button');

var currentlyPlaying;

/* ====================== Event Handlers ============================*/

onePlayerButton.addEventListener('click', function(){
	question1.style.display = 'none';
	question2.style.display = 'block';
	backButtons[0].style.display = 'block';
});

twoPlayerButton.addEventListener('click', function(){
	question1.style.display = 'none';
	question3.style.display = 'block';
	backButtons[0].style.display = 'block';
});

backButtons[0].addEventListener('click', function(){
	question2.style.display = 'none';
	question3.style.display = 'none';
	question1.style.display = 'block';
	backButtons[0].style.display = 'none';
})

onePlayerX.addEventListener('click', function(){
	question2.style.display = 'none';
	backButtons[0].style.display = 'none';
	displayTurn.style.display = 'grid';

	player2Span.innerHTML = 'Computer';
	player1Marker.innerHTML = 'X';
	player2Marker.innerHTML = 'O';
});

onePlayerO.addEventListener('click', function(){
	question2.style.display = 'none';
	backButtons[0].style.display = 'none';
	displayTurn.style.display = 'grid';

	player2Span.innerHTML = 'Computer';
	player1Marker.innerHTML = 'O';
	player2Marker.innerHTML = 'X';
});

twoPlayersX.addEventListener('click', function(){
	question3.style.display = 'none';
	backButtons[0].style.display = 'none';
	displayTurn.style.display = 'grid';

	player2Span.innerHTML = 'Player 2';
	player1Marker.innerHTML = 'X';
	player2Marker.innerHTML = 'O';
});

twoPlayersO.addEventListener('click', function(){
	question3.style.display = 'none';
	backButtons[0].style.display = 'none';
	displayTurn.style.display = 'grid';

	player2Span.innerHTML = 'Player 2';
	player1Marker.innerHTML = 'O';
	player2Marker.innerHTML = 'X';
});


firstTurn.addEventListener('click', function(){
	var number = Math.floor(Math.random() * 2);
	var firstTurn = document.getElementById('who-goes-first-button');
	var whoGoesFirstDiv = document.getElementById('who-goes-first');
	var firstTurnPrompt = document.getElementById('first-turn-prompt');
	var firstTurnResult = document.getElementById('first-turn-result');

	firstTurnPrompt.innerHTML = '';
	firstTurn.style.display = 'none';

	if (number === 0){
		firstTurnResult.innerHTML = 'Player 1 will go first';
		player1.style.backgroundColor = 'pink';
		currentlyPlaying = player1Marker;
		setTimeout(function(){
			gameBoard.style.display = 'grid';
		}, 1000)
	} else {
		if (player2Span.innerHTML ==='Computer'){
			firstTurnResult.innerHTML = 'The computer will go first';
			player2.style.backgroundColor = 'pink';
			currentlyPlaying = player2Marker;
			setTimeout(function(){
				gameBoard.style.display = 'grid';
			}, 1000)
		} else {
			firstTurnResult.innerHTML = 'Player 2 will go first';
			player2.style.backgroundColor = 'pink';
			currentlyPlaying = player2Marker;
			setTimeout(function(){
				gameBoard.style.display = 'grid';
			}, 1000)
		}
	}

	setTimeout(function(){
		firstTurnResult.innerHTML = '';
		whoGoesFirst.style.display = 'none';
		quitGameDiv.style.display = 'block';
	}, 1000)

});

quitGameButton.addEventListener('click', function(){
	quitGameDiv.style.display = 'none';
	resetGameBoard();
	resetGame();
});
 /* ========================== Game Logic =================================*/

 


	gameBoard.addEventListener('click', function(e){

		if (currentlyPlaying === player1Marker) {
			if (e.target.innerHTML === ''){
				e.target.innerHTML = player1Marker.innerHTML;

				if ( checkForWinner() ){
					quitGameDiv.style.display = 'none';
					document.getElementById('display-winner').innerHTML = 'Player 1 has won the game.';
					//isPlaying = false;
					playAgain();
				} else if( checkForDraw() ){
					quitGameDiv.style.display = 'none';
					document.getElementById('display-winner').innerHTML = 'The game was a draw.';
					//isPlaying = false;
					playAgain();
				} else {
					player1.style.backgroundColor = '#dbeae5';
					currentlyPlaying = player2Marker;
					player2.style.backgroundColor = 'pink';
					setTimeout(function(){
						computerPlay();
					}, 1000);
				}

			} else {
				alert('Please choose an empty spot on the board.');
			}
			
		} else {
			if (e.target.innerHTML === ''){
				e.target.innerHTML = player2Marker.innerHTML;

				if ( checkForWinner() ){
					if (player2Span.innerHTML === 'Computer'){
						quitGameDiv.style.display = 'none';
						document.getElementById('display-winner').innerHTML = 'The computer has won the game.';
						//isPlaying = false;
						playAgain();
					} else {
						quitGameDiv.style.display = 'none';
						document.getElementById('display-winner').innerHTML = 'Player 2 has won the game.';
						//isPlaying = false;
						playAgain();
					}
					
				} else if( checkForDraw() ){
					quitGameDiv.style.display = 'none';
					document.getElementById('display-winner').innerHTML = 'The game was a draw.';
					//isPlaying = false;
					playAgain();
				} else {
					player2.style.backgroundColor = '#dbeae5';
					currentlyPlaying = player1Marker;
					player1.style.backgroundColor = 'pink';
				}
				
			} else {
				alert ('Please choose an empty spot on the board.')
			}
		}
	});

/* =================================== Functions =================================*/

function resetPlayer1(){
	player1Marker.innerHTML = '';
	player1.style.backgroundColor = '#dbeae5';
}

function resetPlayer2(){
	player2.style.backgroundColor = '#dbeae5';
	player2Span.innerHTML = '';
	player2Marker.innerHTML = '';
}

function resetGameBoard(){
	resetPlayer1();
	resetPlayer2();
	document.getElementById('display-winner').innerHTML = '';
	whoGoesFirst.style.display = 'block';
	firstTurnPrompt.innerHTML = 'Click the button to randomly determine who will go first.';
	firstTurn.style.display = 'inline-block';
}

function resetGame(){
	resetGameBoard();

	for (var i = 0; i < gameBoard.children.length; i++){
		gameBoard.children[i].innerHTML = '';
	}

	gameBoard.style.display = 'none';
	displayTurn.style.display = 'none';
	question1.style.display = 'block';
}

function computerPlay(){
	var space = Math.floor(Math.random() * 9);
	if (gameBoard.children[space].innerHTML === ''){
		var target = gameBoard.children[space];
		return target.click();
	} else {
		return computerPlay();
	}
}

function checkForDraw(){
	for (var i = 0; i < gameBoard.children.length; i++){
		if(gameBoard.children[i].innerHTML === ''){
			return false;
		}
	}
	return true;
}


function checkForWinner(){
	var children = gameBoard.children;
	var winner = false;

	if ((children[0].innerHTML === 'X' && children[1].innerHTML === 'X' && children[2].innerHTML === 'X') || (children[0].innerHTML === 'O' && children[1].innerHTML === 'O' && children[2].innerHTML === 'O')){
		winner = true;
	} else if ((children[3].innerHTML === 'X' && children[4].innerHTML === 'X' && children[5].innerHTML === 'X') || (children[3].innerHTML === 'O' && children[4].innerHTML === 'O' && children[5].innerHTML === 'O')){
		winner = true;
	} else if ((children[6].innerHTML === 'X' && children[7].innerHTML === 'X' && children[8].innerHTML === 'X') || (children[6].innerHTML === 'O' && children[7].innerHTML === 'O' && children[8].innerHTML === 'O')){
		winner = true;
	} else if ((children[0].innerHTML === 'X' && children[3].innerHTML === 'X' && children[6].innerHTML === 'X') || (children[0].innerHTML === 'O' && children[3].innerHTML === 'O' && children[6].innerHTML === 'O')){
		winner = true;
	} else if ((children[1].innerHTML === 'X' && children[4].innerHTML === 'X' && children[7].innerHTML === 'X') || (children[1].innerHTML === 'O' && children[4].innerHTML === 'O' && children[7].innerHTML === 'O')){
		winner = true;
	} else if ((children[2].innerHTML === 'X' && children[5].innerHTML === 'X' && children[8].innerHTML === 'X') || (children[2].innerHTML === 'O' && children[5].innerHTML === 'O' && children[8].innerHTML === 'O')){
		winner = true;
	} else if ((children[0].innerHTML === 'X' && children[4].innerHTML === 'X' && children[8].innerHTML === 'X') || (children[0].innerHTML === 'O' && children[4].innerHTML === 'O' && children[8].innerHTML === 'O')){
		winner = true;
	} else if ((children[2].innerHTML === 'X' && children[4].innerHTML === 'X' && children[6].innerHTML === 'X') || (children[2].innerHTML === 'O' && children[4].innerHTML === 'O' && children[6].innerHTML === 'O')){
		winner = true;
	}
	return winner;
}

function playAgain(){
	setTimeout(function(){
		resetGameBoard();
		resetGame();
	}, 5000)
}

function playGame(){
	
}









