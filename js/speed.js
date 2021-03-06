const speedNames = {
    easy: 'EASY',
    medium: 'MEDIUM',
    hard: 'HARD',
    nightmare: 'NIGHTMARE',
    impossible: 'IMPOSSIBLE'
};

function openSpeedMenu() {
    pong.stop();
    speedMenu.style.display = 'block';
    field.style.filter = "blur(2px)";
    leftPlayerName.style.filter = "blur(2px)";
    speedBtn.style.filter = "blur(2px)";
    homeIcon.style.filter = "blur(2px)";
    playIcon.style.filter = "blur(2px)";
}

function changeSpeed(speed) {
    function changeText() {
        return speedBtn.innerHTML = 'Speed: ' + speed;
    }

    switch (speed) {
        case speedNames.easy:
            pong.initialSpeed = ballSpeed.EASY;
            // multiplayerpong.initialSpeed = ballSpeed.EASY;
            changeText();
            break;
        case speedNames.medium:
            pong.initialSpeed = ballSpeed.MEDIUM;
            // multiplayerpong.initialSpeed = ballSpeed.MEDIUM;
            changeText();
            break;
        case speedNames.hard:
            pong.initialSpeed = ballSpeed.HARD;
            // multiplayerpong.initialSpeed = ballSpeed.MEDIUM;
            changeText();
            break;
        case speedNames.nightmare:
            pong.initialSpeed = ballSpeed.NIGHTMARE;
            // multiplayerpong.initialSpeed = ballSpeed.MEDIUM;
            changeText();
            break;
        case speedNames.impossible:
            pong.initialSpeed = ballSpeed.IMPOSSIBLE;
            // multiplayerpong.initialSpeed = ballSpeed.MEDIUM;
            changeText();
            break;
    }
}

function chooseSpeed() {
    document.addEventListener('click', (event) => {
        switch (event.target.id) {
            case 'speedEasyBtn':
                changeSpeed(speedNames.easy);
                break;
            case 'speedMediumBtn':
                changeSpeed(speedNames.medium);
                break;
            case 'speedHardBtn':
                changeSpeed(speedNames.hard);
                break;
            case 'speedNightmareBtn':
                changeSpeed(speedNames.nightmare);
                break;
            case 'speedImpossibleBtn':
                changeSpeed(speedNames.impossible);
                break;
        }

        event.preventDefault();
    }, false)
}

document.getElementById('speedBtn').addEventListener('click', () => openSpeedMenu());
chooseSpeed();
