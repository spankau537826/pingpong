const pong = new Pong(field);

field.addEventListener('click', () => pong.play());

playIcon.addEventListener('click', () => pong.play());

restartIcon.addEventListener('click', () => pong.stop());

homeIcon.addEventListener('click', () => pong.home());

pong.start();
