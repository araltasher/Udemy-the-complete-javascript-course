/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.querySelector(".dice").style.display = "none";
document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

document.querySelector(".btn-roll").addEventListener("click", function() {
  //  1. Random Number
  let dice = Math.floor(Math.random() * 6) + 1;

  //  2. Display the result
  const diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";

  //  3. Update the round IF the rolled number is NOT 1

  if (dice !== 1) {
    // Add score
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    changeRound();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    //  Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    //  Update the UI
    document.getElementById("score-" + activePlayer).textContent = String(scores[activePlayer]);
    
    //  Check if the player Won
    if(scores[activePlayer] >= 12){
        document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
        document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
      document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
      document.querySelector(".dice").style.display = "none";
    }
    else{
    changeRound();
    }

});

function changeRound(){
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("active");
    document.querySelector(".dice").style.display = "none";
}

//document.querySelector("#current-" + activePlayer).innerHTML = "<em>"+dice+"</em>";
//let x = document.querySelector("#score-" + activePlayer).textContent;
