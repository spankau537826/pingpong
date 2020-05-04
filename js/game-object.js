// color variables
const fieldColor = '#085c3f';
const rectColor = '#fff';
const ballColor = 'red';

// speed
const ballSpeed = {
    EASY: 300,
    MEDIUM: 400,
    HARD: 600,
    NIGHTMARE: 800,
    IMPOSSIBLE: 1500
};

// maximal score
const maxScore = 10;

// communication buttons
const field = document.getElementById('pong');
const menu = document.getElementById('menu');
const homeIcon = document.getElementById('homeIcon');
const playIcon = document.getElementById('playIcon');
const restartIcon = document.getElementById('restartIcon');

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
