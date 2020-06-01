var isMultiplayerSession =  Boolean(false);

function initialize() {
    menu.style.display = 'none';
    speedMenu.style.display = 'none';
    gameOver.style.display = 'none';

    field.style.filter = "blur(0px)";
    speedBtn.style.display = "block";
    homeIcon.style.display = "block";
    playIcon.style.display = "block";
    restartIcon.style.display = "none";

    speedBtn.style.filter = "blur(0px)";
    homeIcon.style.filter = "blur(0px)";
    playIcon.style.filter = "blur(0px)";
    restartIcon.style.filter = "blur(0px)";
}

function initializeMultiplayer() {
    menu.style.display = 'none';
    speedMenu.style.display = 'none';
    gameOver.style.display = 'none';

    field.style.filter = "blur(0px)";
    speedBtn.style.display = "block";
    homeIcon.style.display = "block";
    playIcon.style.display = "block";
    restartIcon.style.display = "none";

    speedBtn.style.filter = "blur(0px)";
    homeIcon.style.filter = "blur(0px)";
    playIcon.style.filter = "blur(0px)";
    restartIcon.style.filter = "blur(0px)";
    isMultiplayerSession = Boolean(true);
}

let modalHidden = true;
function pop() {
    const modalId = document.getElementById("anleitung");
    if (modalHidden === true) {
        modalId.style.display = "block";
        modalHidden = false;
    } else {
        modalId.style.display = "none";
        modalHidden = true;
    }
}

var socket = io();
socket.emit('new player');
socket.on('message', function(data) {
  console.log(data);
});
socket.on('servererror',function(err) {
    window.alert("Es konnte keine Session erstellt werden. Bitte schließen Sie das Fenster und versuchen Sie es erneut.");
});
