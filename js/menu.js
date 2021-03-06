var sessiontype =  'single';
var socket = io();

function wait() {
    lobby.start();
    window.location.href = "./lobby.html";
}

function initializeGame() {
    menu.style.display = 'none';
    speedMenu.style.display = 'none';
    gameOver.style.display = 'none';

    field.style.filter = "blur(0px)";
    leftPlayerName.style.display = "block";
    speedBtn.style.display = "block";
    homeIcon.style.display = "block";
    playIcon.style.display = "block";
    restartIcon.style.display = "none";

    leftPlayerName.style.filter = "blur(0px)";
    speedBtn.style.filter = "blur(0px)";
    homeIcon.style.filter = "blur(0px)";
    playIcon.style.filter = "blur(0px)";
    restartIcon.style.filter = "blur(0px)";
    sessiontype =  'single';
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

function load() {
    const loadingPage = document.getElementById("loadScreen");
    if (modalHidden === true) {
        loadingPage.style.display = "block";
        modalHidden = false;
        const sessionid = document.getElementById("sessionid");
        socket.emit('getting session',sessionid);
    } else {
        loadingPage.style.display = "none";
        modalHidden = true;
    }
}

// useEffect(()=>{
    // socket.emit('new player');

    socket.on('servererror',function(err) {
        window.alert("Es konnte keine Session erstellt werden. Bitte schließen Sie das Fenster und versuchen Sie es erneut.");
    });

    socket.on('sessionid',function(data) {
        const sessionid = data;
        localStorage.setItem("sessionid",sessionid);
    });

    socket.on('session closed', function() {
        localStorage.clear();
        console.log('session closed');
    });

    socket.on('ready for game',function() {
        
    });
//   }, []);

