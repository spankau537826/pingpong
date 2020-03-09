const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// context.fillStyle = "black";
// context.fillRect(100, 200, 50, 75);
// context.fillStyle = "red";
// context.beginPath();
// context.arc(300, 350, 100, 0, Math.PI*2, false);
// context.closePath();
// context.fill();


function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, false);
  ctx.closePath();
  ctx.fill();
}

function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "75px fantasy";
  ctx.fillText(text, x, y);
}

drawRect(100, 100, 100, 100, red);
