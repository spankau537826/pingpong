const pong = new Pong(field);
// const multiplayerpong = new MultiplayerPong(multiplayerfield);


field.addEventListener('click', () => pong.play());

playIcon.addEventListener('click', () => pong.play());

restartIcon.addEventListener('click', () => pong.stop());

homeIcon.addEventListener('click', () => pong.home());

singleplayerBtn.addEventListener('click', () => pong.play());

pong.start();
// multiplayerpong.start();

// function controlGame(action) {
//     switch (action) {
//         case 'play':
//             if (sessiontype === 'multi') {
//                 multiplayerpong.play();
//             } else {
//                 pong.play();
//             }
//             break;
//         case 'stop': 
//             if (sessiontype === 'multi') {
//                 multiplayerpong.stop();
//             } else {
//                 pong.stop();
//             }
//             break;
//         case 'home':
//             if (sessiontype === 'multi') {
//                 multiplayerpong.home();
//             } else {
//                 pong.home();
//             }
//         break;
//     }
// }
