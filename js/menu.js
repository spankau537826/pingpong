function initialize() {
    menu.style.display = 'none';
    speedMenu.style.display = 'none';
    field.style.filter = "blur(0px)";
    speedBtn.style.display = "block";
    homeIcon.style.display = "block";
    playIcon.style.display = "block";
    speedBtn.style.filter = "blur(0px)";
    homeIcon.style.filter = "blur(0px)";
    playIcon.style.filter = "blur(0px)";
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
