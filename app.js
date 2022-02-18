const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let score = 0;
let time = 0;
let shotSound;

const thugs = [
  'center / cover no-repeat url("img/bandit.png")',
  'center / cover no-repeat url("img/bandit2.png")',
  'center / cover no-repeat url("img/bandit3.png")'                     
];

// Event listeners
startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    // parseInt = string -> number data type
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', (event) => {
  // shot sound
  shotSound = new Audio();
  shotSound.src = 'sound/9_mm_gunshot.mp3';
  shotSound.play();
  
  if (event.target.classList.contains('target')) {
    score++;
    event.target.remove();
    createRandomTarget();
  }
});

// Functions
function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomTarget();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
    current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function createRandomTarget() {
  const target = document.createElement('div');
  const size = getRandomNumber(45, 90);
  setRandomThug(target);

  const {width, height} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  target.classList.add('target');
  target.style.top = `${y}px`;
  target.style.left = `${x}px`;
  target.style.width = `${size}px`;
  target.style.height = `${size}px`;

  board.append(target);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomThug() {
  const indexthug = Math.floor(Math.random() * thugs.length);
  return thugs[indexthug];
}
function setRandomThug(item) {
  const bg = getRandomThug();
  item.style.background = bg;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`;
}

/* function winTheGame() {    
  function kill() {
    const mainTarget = document.querySelector('.target');

    if(mainTarget) {
      mainTarget.click();
    }
  }

  setInterval(kill, 75);
} */