function initialize() {
    menu.style.display = 'none';
    field.style.filter = "blur(0px)";
    homeIcon.style.display = "block";
    playIcon.style.display = "block";
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
