//ELEMENTS
let segments = document.querySelectorAll(".segment");
const snake = document.getElementById("snake");
snake.style.position = "absolute";
const dodane = document.querySelector(".dodane");
const moveCounter = document.querySelector(".move");
const wisnia = document.querySelector(".wisnia");
const przedluz = document.getElementById("przedluz");
const lista = document.querySelector(".lista");
const scoreBoard = document.querySelector(".cherries");
const segmenty = document.querySelector(".segmenty");
const content = document.querySelector(".page-content");
const napisy = document.querySelector(".gameOver");
const wyniki = document.getElementById("wyniki");
const newGame = document.getElementById("newGame");

let moveLog = []; //LOG REMEMBERING MOVEMENTS
let turn_nr = 0;
let score = 0;
//CONFIG

//start position
let position = {
  t: 300,
  l: 300,
  dir: "top",
};
let segmentyStart = 3;
let wonszSize = 30; //SNAKE SIZE
let movementSpeed = 1 * wonszSize;
let timeRate = 150;
let wisniaPosition = {
  t: 0,
  l: 0,
};

//EVENTS LISTENERS

document.addEventListener("keydown", Turn);
newGame.addEventListener("click", () => {
  window.location.reload(true);
});

//FUNCTIONS

//REFRESHES POSITION
function setPosition(t, l, obj) {
  obj.style.top = `${t}px`;
  obj.style.left = `${l}px`;
}

//MAKE CHERRY
function generujWisnie() {
  wisnia.style.display = "block";
  wisniaPosition.t = Math.floor(Math.random() * 19 + 1) * wonszSize;
  wisniaPosition.l = Math.floor(Math.random() * 19 + 1) * wonszSize;
  setPosition(wisniaPosition.t, wisniaPosition.l, wisnia);
}

//ASIGNMENT OF ID FOR EACH SEGMENT
function SegmentsID() {
  let i = 0;
  segments.forEach((segment) => {
    segment.id = i;
    ++i;
  });
}

//SETTING POSITION OF SEGMENTS (STARTING) <--------- ostatni BUG
function setSegments(t, l) {
  segments.forEach((segment) => {
    let logObject = {
      t: t + segment.id * wonszSize,
      l: l,
    };
    setPosition(logObject.t, logObject.l, segment);
    moveLog.push(logObject);
  });
}

//MAKING TURNS
function Turn(e) {
  if (position.dir == "top") {
    switch (e.code) {
      case "KeyA":
        position.dir = "left";
        break;
      case "KeyD":
        position.dir = "right";
        break;
    }
  } else if (position.dir == "left") {
    switch (e.code) {
      case "KeyW":
        position.dir = "top";
        break;
      case "KeyS":
        position.dir = "bot";
        break;
    }
  } else if (position.dir == "bot") {
    switch (e.code) {
      case "KeyA":
        position.dir = "left";
        break;
      case "KeyD":
        position.dir = "right";
        break;
    }
  } else {
    switch (e.code) {
      case "KeyW":
        position.dir = "top";
        break;
      case "KeyS":
        position.dir = "bot";
        break;
    }
  }
}

// CONSTANT MOVEMENT - MARKS COORDINATES IN THE LOG HISTORY /IT'S HISTORY OF HEAD MOVEMENTS
function movement() {
  turn_nr++;
  let logObject = {
    t: position.t,
    l: position.l,
  };
  segments = document.querySelectorAll(".segment");
  let Wonsz = ustalWensza();
  if (
    position.t < 0 ||
    position.t >= 600 ||
    position.l < 0 ||
    position.l >= 600 // dodac eats
  ) {
    endgame();
  } else {
    if (position.t === wisniaPosition.t && position.l === wisniaPosition.l) {
      generujWisnie();
      dodajSegment();
      dodajPunkt();
    }
    Wonsz.forEach((e) => {
      if (turn_nr != 1 && position.t == e.t && position.l == e.l) {
        endgame();
      }
    });
    moveLog.unshift(logObject);
    if (position.dir == "bot") {
      position.t += movementSpeed;
    } else if (position.dir == "top") {
      position.t -= movementSpeed;
    } else if (position.dir == "left") {
      position.l -= movementSpeed;
    } else {
      position.l += movementSpeed;
    }

    segments.forEach((segment) => {
      let destination = moveLog[segment.id];
      setPosition(destination.t, destination.l, segment);
    });
    moveCounter.textContent = `  ${turn_nr}`;
  }
}

//ADD SEGMENT
function dodajSegment() {
  const nowySegment = document.createElement("div");
  dodane.appendChild(nowySegment);
  nowySegment.id = segments.length;
  let destination = moveLog[nowySegment.id - 1];
  setPosition(destination.t, destination.l, nowySegment);
  nowySegment.classList.add("segment");
}

//CHECK WHERE IS SNAKE
function ustalWensza(leng) {
  let obecnyWonsz = [];
  let i = 0;
  while (i < segments.length) {
    obecnyWonsz.push(moveLog[i]);
    i++;
  }
  return obecnyWonsz;
}

function wonszTest(logt, logl, Wonsz) {
  Wonsz.forEach((e) => {
    if (e.t === logt && e.l === logl) {
      return true;
    }
  });
}

//ADD SCORE TO SCOREBOARD
function dodajPunkt() {
  score++;
  scoreBoard.textContent = score;
}

// FAILURE EVENTS

function endgame() {
  console.log("koniec");
  clearInterval(MoveSnake);
  content.classList.add("active");
  napisy.classList.add("show");
  wyniki.textContent = `Your score is: ${score}`;
}

//TIME
let MoveSnake = setInterval(movement, timeRate);

// MAIN
function main() {
  SegmentsID();
  setSegments(position.t, position.l);
  generujWisnie();
  MoveSnake;
}

main();
