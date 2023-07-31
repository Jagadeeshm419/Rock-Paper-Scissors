// Random Number:
function pickComputerMove() {
  let randomNumber = Math.random();
  let computerMove = '';

  if (0 <= randomNumber && randomNumber < 1 / 3) {
    computerMove = 'Rock';
  }

  else if (1 / 3 <= randomNumber && randomNumber < 2 / 3) {
    computerMove = 'Paper';
  }

  else if (2 / 3 <= randomNumber && randomNumber < 1) {
    computerMove = 'Scissors';
  }

  return computerMove;
}

// Result:
let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};
updateScore();

//Player Move:
function playGame(playerMove) {
  let computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie';
    }
    else if (computerMove === 'Paper') {
      result = 'You Lose';
    }
    else if (computerMove === 'Scissors') {
      result = 'You Win';
    }
  }

  else if (playerMove === "Paper") {
    if (computerMove === 'Rock') {
      result = 'You Win';
    }
    else if (computerMove === 'Paper') {
      result = 'Tie';
    }
    else if (computerMove === 'Scissors') {
      result = 'You Lose';
    }
  }

  else if (playerMove === "Scissors") {
    if (computerMove === 'Rock') {
      result = 'You Lose';
    }
    else if (computerMove === 'Paper') {
      result = 'You Win';
    }
    else if (computerMove === 'Scissors') {
      result = 'Tie';
    }
  }

  if (result === 'You Win') {
    score.Wins += 1;
  }
  else if (result === 'You Lose') {
    score.Losses += 1;
  }
  else if (result === 'Tie') {
    score.Ties += 1
  }
  localStorage.setItem('score', JSON.stringify(score))

  //Update Moves:
  document.querySelector('.js-moves').innerHTML =
    `You <img src="img/${playerMove}-emoji.png" class="img-icon">
    <img src="img/${computerMove}-emoji.png" class="img-icon"> Computer`

  //Update Result:
  document.querySelector('.js-result').innerHTML = `Result : ${result}`

  //Update Score:
  updateScore();
}

function updateScore() {
  document.querySelector('.js-score').innerHTML = `Wins : ${score.Wins}, Losses : ${score.Losses}, Ties : ${score.Ties}`
}

//Autoplay Game:
isAutoPlaying = false;
let intervalId;

function autoplay(){

  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);

    isAutoPlaying=true;
  }

  else{
    clearInterval(intervalId);
    isAutoPlaying=false;
  }
}

/*Adding EventListener: */

//RPS KeyDown :
document.body.addEventListener('keydown', (event) =>{
  if(event.key==='r'){
    playGame('Rock');
  }
  else if(event.key==='p'){
    playGame('Paper');
  }
  else if(event.key==='s'){
    playGame('Scissors');
  }
});

//Rock Button:
document.querySelector('.rock-img-button').addEventListener('click', () => {
  playGame('Rock');
}); 

//Paper Button:
document.querySelector('.paper-img-button').addEventListener('click', () => {
  playGame('Paper');
});

//Scissors Button:
document.querySelector('.scissors-img-button').addEventListener('click', () => {
  playGame('Scissors');
});

//Reset Button:
function reset () {
  score.Wins = 0;
  score.Losses = 0;
  score.Ties = 0;
  localStorage.removeItem('score');
  updateScore();
}
document.querySelector('.reset').addEventListener('click', () => {
  reset();
});

//Reset Button KeyDown:
document.body.addEventListener('keydown', (event) => {
  if(event.key=== 'Escape'){
    reset();
  }
});

//Autoplay Button:
document.querySelector('.js-autoplay').addEventListener('click', () => {
  autoplay()
});

//AutoPlay Button KeyDown:
document.body.addEventListener('keydown', (event) => {
  if(event.key=== 'a'){
    autoplay();
  }
});
