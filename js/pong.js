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

drawRect(300, 200, 100, 100, 'yellow');
drawCircle(100, 100, 16, 'red');
drawText('my text', 100, 100, 'blue');
