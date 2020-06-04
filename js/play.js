const pong = new Pong(field);
// const multiplayerpong = new MultiplayerPong(multiplayerfield);


field.addEventListener('click', () => pong.play());

playIcon.addEventListener('click', () => pong.play());

restartIcon.addEventListener('click', () => pong.stop());

homeIcon.addEventListener('click', () => pong.home());

singleplayerBtn.addEventListener('click', () => pong.play());

pong.start();
