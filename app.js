//ELEMENTS

const pac = document.querySelector(".box");
// STARTGING POSITION

let position = {
  left: 50,
  top: 50,
};

let moveRate = 3;

//SET PAC
pac.style.position = "absolute";

document.addEventListener("keydown", movement);
function setPosition(l, t) {
  pac.style.top = `${t}%`;
  pac.style.left = `${l}%`;
}

function movement(e) {
  switch (e.code) {
    case "KeyA":
      position.left -= moveRate;
      break;
    case "KeyD":
      position.left += moveRate;
      break;
    case "KeyW":
      position.top -= moveRate;
      break;
    case "KeyS":
      position.top += moveRate;
      break;
  }
  setPosition(position.left, position.top);
}

setPosition(position.left, position.top);
