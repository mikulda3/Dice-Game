var totalScore, roundScore, activePlayer, dice, playGame;
var goalScore = 30;
let winningScreen = document.getElementById("winning-screen");
newGame();

// new game
function newGame(){
  totalScore = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  playGame = true;
  
  winningScreen.style.visibility = "hidden";
  
  document.getElementsByClassName("player-0")[0].style.visibility = "visible";
  document.getElementsByClassName("player-1")[0].style.visibility = "visible";
  
  document.getElementById("player-0__total-score").textContent = 0;
  document.getElementById("player-1__total-score").textContent = 0;
  document.getElementById("player-0__current-score").textContent = 0;
  document.getElementById("player-1__current-score").textContent = 0;
  
  document.getElementsByClassName("dice-image")[0].style.visibility = "hidden";
  document.querySelector("#player-0__name").textContent = "Player 1 Score";
  document.querySelector("#player-1__name").textContent = "Player 2 Score";

  document.querySelector(".player-0__total-score").classList.add("active");
  document.querySelector(".player-1__total-score").classList.remove("active");

  document.querySelector(".roll-dice").style.visibility = "visible";
  document.querySelector(".pass-round").style.visibility = "visible";
}

// roll the dice
document.querySelector(".roll-dice").addEventListener("click", function(){
  if(playGame){
    // change image
    var dice = Math.ceil(Math.random()*6);  
    var diceElement = document.querySelector(".dice-image");
    diceElement.src = "img/" + dice + ".jpg";
    diceElement.style.visibility = "visible";
  
    // change players
    if(dice == 1){
      nextPlayer();
    // add score
    } else {
      roundScore += dice;
      document.getElementById("player-" + activePlayer + "__current-score").textContent = roundScore;
    }
  }
});

// next player
function nextPlayer() {
  activePlayer = +!activePlayer;
  roundScore = 0;
  document.getElementById("player-0__current-score").textContent = 0;
  document.getElementById("player-1__current-score").textContent = 0;
  // document.getElementsByClassName("dice-image")[0].style.visibility = "hidden";

  document.querySelector(".player-0__total-score").classList.toggle("active");
  document.querySelector(".player-1__total-score").classList.toggle("active");
}

// pass round
document.querySelector(".pass-round").addEventListener("click", function(){
  if(playGame){
    totalScore[activePlayer] += roundScore;
    document.querySelector("#player-" + activePlayer + "__total-score").textContent = totalScore[activePlayer];
  
    // check if player won
    if(totalScore[activePlayer] >= goalScore){
      document.getElementsByClassName("player-0")[0].style.visibility = "hidden"
      document.getElementsByClassName("player-1")[0].style.visibility = "hidden"
      document.getElementsByClassName("dice-image")[0].style.visibility = "hidden";
      
      winningScreen.style.visibility = "visible";
      winningScreen.innerHTML = "Congratulations! Player " + (activePlayer + 1) + " Won!";
      playGame = false;
      document.querySelector(".roll-dice").style.visibility = "hidden";
      document.querySelector(".pass-round").style.visibility = "hidden";
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".new-game").addEventListener("click", newGame);
