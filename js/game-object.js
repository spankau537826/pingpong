// color variables
const fieldColor = '#085c3f';
const rectColor = '#fff';
const ballColor = 'red';

// speed
const ballSpeed = {
    EASY: 300,
    MEDIUM: 550,
    HARD: 750,
    NIGHTMARE: 1000,
    IMPOSSIBLE: 1500
};

// maximal score
const maxScore = 10;

// communication buttons
const field = document.getElementById('pong');
const multiplayerfield = document.getElementById('multiplayerpong');
const menu = document.getElementById('menu');
const leftPlayerName = document.getElementById('leftPlayerName');
const rightPlayerName = document.getElementById('rightPlayerName');
const speedMenu = document.getElementById('speedMenu');
const speedBtn = document.getElementById('speedBtn');
const homeIcon = document.getElementById('homeIcon');
const playIcon = document.getElementById('playIcon');
const restartIcon = document.getElementById('restartIcon');
const gameOver = document.getElementById('gameOver');
const playAgainBtn = document.getElementById('playAgainBtn');
const changeSpeedBtn = document.getElementById('changeSpeedBtn');
const homeBtn = document.getElementById('homeBtn');
const multiplayerBtn = document.getElementById('multiplayerBtn');
const singleplayerBtn = document.getElementById('ubungBtn');

class GameObject {
    constructor(x = 0, y = 0, r, color) {
        this.pos = new Vec(0, 0);
        this.size = new Vec(x, y);
        this._radius = r;
        this._color = color;
    }

    get left() {
        return this.pos.x - this.size.x / 2;
    }

    get right() {
        return this.pos.x + this.size.x / 2;
    }

    get top() {
        return this.pos.y - this.size.y / 2;
    }

    get bottom() {
        return this.pos.y + this.size.y / 2;
    }
}
