const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

function drawRect(x, y, w, h, color) {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI*2, false);
  context.closePath();
  context.fill();
}

function drawText(text, x, y, color) {
  context.fillStyle = color;
  context.font = "75px fantasy";
  context.fillText(text, x, y);
}

//Create game objects
var oldX = 10, oldY = 150, newX, newY;
var player = new Player(oldX,oldY,'grey');
var opponent = new Player(570,150,'grey');
var ball = new Ball(300,150,'red');
player.draw();
opponent.draw();
ball.draw();

//Get mouse poasition and move player
canvas.addEventListener("mousemove", function(e) 
{
  var cRect = canvas.getBoundingClientRect();
  newY = e.clientY - cRect.top;

  if (newY <= cRect.bottom - 110) { 
    player.clear(context,oldX,oldY);
    player.move(newY);
  } 
  oldY = newY;
})
// drawRect(10, 150, 20, 100, 'grey');
// drawRect(570, 150, 20, 100, 'grey');
// drawCircle(300, 150, 16, 'red');
