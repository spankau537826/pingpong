const menu = document.getElementById('menu');

function initialize() {
    menu.style.display = 'none';
    document.getElementById("pong").style.filter = "blur(0px)";
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
