/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;

init();

//let lastDice;

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //  1. Random Number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    //  2. Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = "dice-" + dice1 + ".png";
    document.getElementById('dice-2').src = "dice-" + dice2 + ".png"; 

    //  3. Update the round IF the rolled number is NOT 1
    /*if (dice1 === 6 && lastDice === 6) {
      //  Player loses all score if he rolls 6 twice
      scores[activePlayer] = 0;
      document.getElementById("score-" + activePlayer).textContent = '0';
      changeRound();

    }
    else*/ if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      changeRound();
    }

    //lastDice = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //  Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    //  Update the UI
    document.getElementById("score-" + activePlayer).textContent = String(scores[activePlayer]);

    let input = document.querySelector('.final-score').value;
    let winningScore;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    //  Check if the player Won
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
      gamePlaying = false;
    }
    else {
      changeRound();
    }
  }

});

document.querySelector('.btn-new').addEventListener('click', init);

function changeRound() {
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = roundScore;
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("active");
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init() {
  gamePlaying = true;
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel")
    .classList.remove("winner");
  document.querySelector(".player-0-panel")
    .classList.remove("active");
  document.querySelector(".player-0-panel")
    .classList.add("active");
  document.querySelector(".player-1-panel")
    .classList.remove("winner");
  document.querySelector(".player-1-panel")
    .classList.remove("active");
}
