var speedY = 15;
var over = false;
var started = false;
var firstClickedTime;

var buttonLClicks = 0;
var buttonRClicks = 0;
// Create your event handlers here

setProperty("buttonL_CPS", "hidden", true);
setProperty("buttonR_CPS", "hidden", true);
setProperty("bot_on", "hidden", true);

function loop() {
  setTimeout(function() {
    if (!toggleSwitch.isOpen) {
      setProperty("bot_on", "hidden", false);
      buttonPressed("R");
    } else {
      setProperty("bot_on", "hidden", true);
    }
    loop();
  }, randomNumber(200, 300));
}

loop();

onEvent("replay_button", "click", function( ) {
  reset();
});

onBoardEvent(buttonL, "down", function() {
  buttonPressed("L");
});

onBoardEvent(buttonR, "down", function() {
  buttonPressed("R");
});
// Create your functions here
function buttonPressed(side) {
  if (over) {
    return;
  }
  if (side === "L") {
    var CPS = ++buttonLClicks / (new Date() - firstClickedTime ) * 1000;
    setProperty("buttonL_CPS", "text", Math.round(CPS) + " CPS");
    moveCar("up");
  } else if (side === "R") {
    var CPS = ++buttonRClicks / (new Date() - firstClickedTime ) * 1000;
    setProperty("buttonR_CPS", "text", Math.round(CPS) + " CPS");
    moveCar("down");
  }
  checkWin();
}
function reset() {
  setProperty("winner", "text", "");
  setScreen("game");
  setProperty("instructions", "hidden", false);
  setProperty("car", "x", 110);
  setProperty("car", "y", 175);
  over = false;
  started = false;
  buttonLClicks = 0;
  buttonRClicks = 0;
  setProperty("buttonL_CPS", "hidden", true);
  setProperty("buttonR_CPS", "hidden", true);
  setProperty("buttonL_CPS", "text", "0 CPS");
  setProperty("buttonR_CPS", "text", "0 CPS");
}
function moveCar(direction) {
  var carY = getProperty("car", "y");
  if (!started) {
    setProperty("instructions", "hidden", true);
    setProperty("buttonL_CPS", "hidden", false);
    setProperty("buttonR_CPS", "hidden", false);
    firstClickedTime = new Date();
    started = true;
  }
  if (direction == "up") {
    setProperty("car", "y", carY - speedY);
  } else if (direction == "down") {
    setProperty("car", "y", carY + speedY);
  }
}
function checkWin() {
  var carY = getProperty("car", "y");
  if (carY < -80) {
    setProperty("winner", "text", "Left");
    setScreen("win");
    over = true;
    buzzer.frequency(500, 500);
  } else if ((carY > 430)) {
    setProperty("winner", "text", "Right");
    setScreen("win");
    over = true;
    buzzer.frequency(250, 500);
  }
}
