//ELEMENTS
const segments = document.querySelectorAll(".segment");
const snake = document.getElementById("snake");
snake.style.position = "absolute";
let moveLog = []; //LOG REMEMBERING MOVEMENTS
let turn_nr = 0;

//CONFIG

//start position
let position = {
  t: 300,
  l: 300,
  dir: "top",
};
let wonszSize = 30; //SNAKE SIZE
let movementSpeed = 1 * wonszSize;

//EVENTS LISTENERS

document.addEventListener("keydown", Turn);
document.addEventListener("click", () => {
  console.log(moveLog);
}); //I USE IT TO LOOK INTO LOG AND DEBUG

//FUNCTIONS

//REFRESHES POSITION
function setPosition(t, l, obj) {
  obj.style.top = `${t}px`;
  obj.style.left = `${l}px`;
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
    // moveLog.push(logObject);
  });
  //moveLog = [];
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
    console.log(destination);
    setPosition(destination.t, destination.l, segment);
  });
}

//zapis powstaje na przyszle ruchy i on zostaje dalej ,trzeba robic refresh

//TIME
let MoveTimeHead = setInterval(movement, 300);

// MAIN
function main() {
  SegmentsID();
  setSegments(position.t, position.l);
  MoveTimeHead;
}
main();
