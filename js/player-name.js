let shortPlayerName;
const pageLoadingTimeout = 500;

function setPlayerName(name) {
    document.getElementById("welcomePlayerName").innerHTML =
        "Willkommen " + name + "!";

    leftPlayerName.innerHTML = name;
}

function enterName() {
    shortPlayerName = prompt("Bitte den Namen eingeben, um das Spiel zu starten \n(Name soll nicht länger als 15 Zeichen sein)");

    if (shortPlayerName !== null) {
        shortPlayerName = shortPlayerName.replace(/[\W_,.]/g, "").trim();
    }

    if (isNaN(+shortPlayerName) && shortPlayerName !== "" && shortPlayerName !== null && shortPlayerName.length < 15) {
        return setPlayerName(shortPlayerName);
    } else {
        alert("Ungültige Eingabe! Der Name soll keine Sonderzeichen oder Ziffern enthalten");
        return enterName();
    }
}

setTimeout(enterName, pageLoadingTimeout);
