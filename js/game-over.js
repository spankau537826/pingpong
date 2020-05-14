function openGameOverMenu() {
    gameOver.style.display = 'block';
    field.style.filter = "blur(2px)";
    speedBtn.style.filter = "blur(2px)";
    homeIcon.style.filter = "blur(2px)";
    restartIcon.style.filter = "blur(2px)";
}

function closeGameOverMenu() {
    pong.resetScore();
    initialize();
}

playAgainBtn.addEventListener('click', () => {
    closeGameOverMenu();
});

changeSpeedBtn.addEventListener('click', () => {
    closeGameOverMenu();
    openSpeedMenu();
});

homeBtn.addEventListener('click', () => {
    closeGameOverMenu();
    pong.home();
});
