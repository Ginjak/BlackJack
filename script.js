// Declaring variables
var gameScore = 21;
var playerScore = 0;
var dealerScore = 0;
var playerTotalScore = 0;
var dealerTotalScore = 0;
var blackJackcalled = false;
var playerWins = 0;
var dealerWins = 0;
var tieTotal = 0;

// Function that generates a random number between min and max values
var randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate random number for a Player between 4 and 21
function playerRoll() {
  return randomNumber(4, 21);
}
function dealerRoll() {
  return randomNumber(2, 11);
}

// Function to generate alert and a winning point to a player if random number is 21 (BlackJack)
function blackJack() {
  // // Adds 1 to playerWins variable (keeps the track of total wins)
  playerWins++;
  // Dsiplays a message (alert)
  alert(`BLACKJACK! YOU WON!
Your Score ${playerTotalScore}
Total Wins: ${playerWins} Total Ties: ${tieTotal} Total Dealer Wins ${dealerWins}`);
  // Changes blackJackcalled from false to true, we will need this in other part of a code (playersTurn function)
  blackJackcalled = true;
  // Confirm message if you would like to play again
  confirm(`Start a new game?`) ? startGame() : alert("See you next time");
}

// Function when dealer wins a game
function dealerWinsGame() {
  // Adds 1 to dealerWinns variable (keeps the track of total wins)
  dealerWins++;
  // Dsiplays a message (alert)
  alert(`
        Dealer won!
        Your score: ${playerTotalScore}
        Dealer score: ${dealerTotalScore}
        Total Wins: ${playerWins} Total Ties: ${tieTotal} Total Dealer Wins ${dealerWins}`);
  // Confirm message if you would like to play again
  confirm(`Start a new game?`) ? startGame() : alert("See you next time");
}
// Function when player wins a game
function playerWinsGame() {
  // Adds 1 to playerWins variable (keeps the track of total wins)
  playerWins++;
  // Dsiplays a message (alert)
  alert(`
        You won!
        Your score: ${playerTotalScore}
        Dealer score: ${dealerTotalScore}
        Total Wins: ${playerWins} Total Ties: ${tieTotal} Total Dealer Wins ${dealerWins}`);
  // Confirm message if you would like to play again
  confirm(`Start a new game?`) ? startGame() : alert("See you next time");
}
// Function when it is a tie
function tieGame() {
  // Adds 1 to tieTotal variable (keeps the track of total ties)
  tieTotal++;
  // Dsiplays a message (alert)
  alert(`
        It's a tie!
        Your score: ${playerTotalScore}
        Dealer score: ${dealerTotalScore}
        Total Wins: ${playerWins} Total Ties: ${tieTotal} Total Dealer Wins ${dealerWins}`);
  // Confirm message if you would like to play again
  confirm(`Start a new game?`) ? startGame() : alert("See you next time");
}

// Function playersTurn

function playersTurn() {
  // Keeps a track how many time condition was looped over (start from 0). We need to check if players number is 21 and if it was on the first loop we will call blackJack function
  var loopIteration = 0;
  // When confirm box is displayed by selecting "OK" it will give as boolean value of true
  var hit = true;
  // While loop. Loop will run while players taotal score is less then gamescor OR we are pressing "OK" on confirm message (keep rolling)
  while (playerTotalScore < gameScore && hit !== false) {
    // Adds 1 to loopIteration so we can track how many type we pressed "OK" on confirm box
    loopIteration++;
    // Caclulates total players score
    // playerRoll() we are calling this function now (function is written on the line 18, it generates random number between 4 and 21)
    // We are adding all random player numbers to playerTotalScore
    playerTotalScore += playerRoll();

    // What happens if number is 21 and it was rolled on the first loop (playerRoll(); generated number 21 straight away)
    if (playerTotalScore === 21 && loopIteration === 1) {
      // We are calling a function blackJack() which is written on the line 26
      blackJack();
      // What happens if players total score is more then 21 (dealer wins the game)
    } else if (playerTotalScore > 21) {
      // So if players total score is more then 21 we are calling a function dealerWinsGame() which is written on the line 40
      dealerWinsGame();
    } else {
      // Confirm message show up and we decide if we would like to increace player total score by another random number by pressing "OK" or we can keep our score by pressing "Cancel".
      hit = confirm(`Your current score is ${playerTotalScore}`);
    }
  }
  // This is a if statement outside of the while loop. Condition check if random number wasn't 21 on the first roll (!blackJackcalled) and if player total score is less or qual to game score (21). Then we call function dealersTurn() which is written on the line  114. Now it is dealers turn
  if (
    !blackJackcalled &&
    (playerTotalScore < gameScore || playerTotalScore === gameScore)
  ) {
    dealersTurn();
  }
}

// Function dealers turn
function dealersTurn() {
  // Caclulates total dealers score
  // dealerRoll() we are calling this function now (function is written on the line 21, it generates random number between 2 and 11)
  // We are adding all random player numbers to playerTotalScore
  dealerTotalScore += dealerRoll();
  // Alert message that display player total score and dealers total score
  alert(`
  Your score: ${playerTotalScore}
  Dealers Score: ${dealerTotalScore}`);
  // While loop, looping while dealers total score is less then game score (21)
  while (dealerTotalScore < gameScore) {
    // Keeps on adding random dealers number
    dealerTotalScore += dealerRoll();
    // if dealers total score is equal or hire then 17 AND dealers total score is less or equal to game score (21) we will check for other condition
    if (dealerTotalScore >= 17 && dealerTotalScore <= gameScore) {
      // if dealers total score is bigger the players scrore (remember dealers total score is inbetween on 17 and 21 at this point).
      if (dealerTotalScore > playerTotalScore) {
        //If condition is met we are calling dealerWinsGame() function (written on line 40). Dealer wins this game
        dealerWinsGame();
        break;
        // if dealers total score is less then players score (remember dealers total score is inbetween on 17 and 21 at this point). We call function playerWinsGame() (line 53). Players wins this game
      } else if (dealerTotalScore < playerTotalScore) {
        playerWinsGame();
        break;
      } else {
        // If either of condition above are not met, then it meens dealers total score and players total score is equal. Then we calling a function tieGame() (line 66). It means we have a tie
        tieGame();
        break;
      }
    }
  }
  // This statment is outside of a loop. It check when loop was active and dealers total score was higher then game score (21) (loop was stopped), automatically player wins and we are calling function playerWinsGame() function.
  if (dealerTotalScore > gameScore) {
    playerWinsGame();
  }
}

// This function reset inital values (same as on line 2 to 7). We are not reseting playerWins, dealerWins,tieTotal because we want to track hot many times game was won/tied/lost
function resetGameValues() {
  gameScore = 21;
  playerScore = 0;
  dealerScore = 0;
  playerTotalScore = 0;
  dealerTotalScore = 0;
  blackJackcalled = false;
}

// This is inital function that start the game itself
// Start the game function
function startGame() {
  // Confirm message shows up and asks us if we would like to play blackjack
  var start = confirm("Would you like to play Blackjack?");
  // If we press "OK" it means start is equal to true and we call function resetGameValues() (line 153) and playersTurn() (line 81). We starting to play the game
  if (start) {
    resetGameValues();
    playersTurn();
    // If we press "Cancel" on initial confirm message will be display "See you next time". We didn't want to play a game.
  } else {
    console.log("See you next time");
  }
}

// We are starting the game by calin startGame() function (line 164)
startGame();
