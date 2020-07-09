//ELEMENTS
const segments = document.querySelectorAll(".segment");
const snake = document.getElementById("snake");
snake.style.position = "absolute";
const snakeAll = document.getElementsByClassName(".snake-all");
const moveCounter = document.querySelector(".move");
const wisnia = document.querySelector(".wisnia");
const przedluz = document.getElementById("przedluz");
let moveLog = []; //LOG REMEMBERING MOVEMENTS
let turn_nr = 0;
let score = 0;
const scoreBoard = document.querySelector(".cherries");

//CONFIG

//start position
let position = {
  t: 300,
  l: 300,
  dir: "top",
};

let wonszSize = 30; //SNAKE SIZE
let movementSpeed = 1 * wonszSize;

let wisniaPosition = {
  t: 0,
  l: 0,
};

//EVENTS LISTENERS

document.addEventListener("keydown", Turn);

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

//SETTING POSITION OF SEGMENTS (STARTING)
function setSegments(t, l) {
  segments.forEach((segment) => {
    setPosition(t + segment.id * wonszSize, l, segment);
    let logObject = {
      t: t + segment.id * wonszSize,
      l: l,
    };
    moveLog.unshift(logObject);
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
  //zapisac weza pozycje na pottrzeby gryzienia sie i generacji wisienki
  // wonsz = []
  // for each segement dodaj jego pozycje do wonsz z loga
  if (
    position.t < 0 ||
    position.t >= 600 ||
    position.l < 0 ||
    position.l >= 600
  ) {
    outOfBoard();
  } else {
    if (position.t === wisniaPosition.t && position.l === wisniaPosition.l) {
      generujWisnie();
      dodajSegment();
      dodajPunkt();
    }
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
  let nowySegment = document.createElement("div");
  nowySegment.classList.add("segment");
  snakeAll.innerHTML += nowySegment;
}
//ADD SCORE TO SCOREBOARD
function dodajPunkt() {
  score++;
  scoreBoard.textContent = score;
}

// FAILURE EVENTS

function outOfBoard() {
  console.log("koniec");
  clearInterval(MoveSnake);
}

//TIME
let MoveSnake = setInterval(movement, 300);

// MAIN
function main() {
  SegmentsID();
  setSegments(position.t, position.l);
  generujWisnie();
  MoveSnake;
}
main();
