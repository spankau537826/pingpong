let animId = null;
// var socket = io();

class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        this.initialSpeed = ballSpeed.EASY;

        this.ball = new Ball;

        this.players = [
            new Player,
            new Player,
        ];

        this.players[0].pos.x = 20;
        this.players[1].pos.x = this._canvas.width - 20;
        this.players.forEach(p => p.pos.y = this._canvas.height / 2);

        var playerdata = {
            x: this.players[0].pos.x,
            y: this.players[0].pos.y
        }
        socket.emit('new player',playerdata);

        let lastTime = null;
        this._frameCallback = (millis) => {
            if (lastTime !== null) {
                const diff = millis - lastTime;
                this.update(diff / 1000);
            }
            lastTime = millis;
            animId = requestAnimationFrame(this._frameCallback);
        };

        this.CHAR_PIXEL = 15;
        this.CHARS = [
            '111101101101111',
            '010010010010010',
            '111001111100111',
            '111001111001111',
            '101101111001001',
            '111100111001111',
            '111100111101111',
            '111001001001001',
            '111101111101111',
            '111101111001111',
        ].map(str => {
            const canvas = document.createElement('canvas');
            const s = this.CHAR_PIXEL;
            canvas.height = s * 5;
            canvas.width = s * 3;
            const context = canvas.getContext('2d');
            context.fillStyle = rectColor;
            str.split('').forEach((fill, i) => {
                if (fill === '1') {
                    context.fillRect((i % 3) * s, (i / 3 | 0) * s, s, s);
                }
            });
            return canvas;
        });

        this.reset();
    }

    clear() {
        this._context.fillStyle = fieldColor;
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    collide(player, ball) {
        if (player.left < ball.right && player.right > ball.left &&
            player.top < ball.bottom && player.bottom > ball.top) {
            ball.vel.x = -ball.vel.x * 1.05;
            const len = ball.vel.len;
            ball.vel.y += player.vel.y * .2;
            ball.vel.len = len;
        }
    }

    drawRect(rect) {
        this._context.fillStyle = rectColor;
        this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }

    drawNet() {
        this._context.strokeStyle = rectColor;
        this._context.beginPath();
        this._context.setLineDash([5, 15]);
        this._context.moveTo(field.width / 2, 1);
        this._context.lineTo(field.width / 2, field.height);
        this._context.stroke();
    }

    drawCircle(circle) {
        this._context.fillStyle = circle._color;
        this._context.beginPath();
        this._context.arc(circle.pos.x, circle.pos.y, circle._radius, 0, Math.PI * 2, false);
        this._context.closePath();
        this._context.fill();
    }

    drawScore() {
        const align = this._canvas.width / 3;
        const cw = this.CHAR_PIXEL * 4;
        if (this.players[0].score <= maxScore && this.players[1].score <= maxScore) {
            this.players.forEach((player, index) => {
                const chars = player.score.toString().split('');
                const offset = align * (index + 1) - (cw * chars.length / 2) + this.CHAR_PIXEL / 2;
                chars.forEach((char, pos) => {
                    this._context.drawImage(this.CHARS[char | 0], offset + pos * cw, 20);
                });
            });
            if (this.players[0].score === maxScore || this.players[1].score === maxScore) {
                openGameOverMenu();
            }
        }

    }

    drawSessionId() 
    {
        var canvas = document.getElementById("pong");
        var ctx = canvas.getContext("2d");
        ctx.font = "15px Arial";
        ctx.fillText("Session-ID: " + window.sessionid, 10, canvas.height);
    };

    resetScore() {
        this.players.forEach(player => player.score = 0);
    }

    draw() {
        this.clear();

        this.drawNet();
        this.drawCircle(this.ball);
        this.players.forEach(player => this.drawRect(player));

        this.drawScore();
        // this.drawSessionId();
    }

    play() {
        this._canvas.addEventListener('mousemove', event => {
            const scale = event.offsetY / (event.target.getBoundingClientRect().height);
            this.players[0].pos.y = scale * this._canvas.height;
        });


        const b = this.ball;
        if (b.vel.x === 0 && b.vel.y === 0) {
            b.vel.x = 200 * (Math.random() > .5 ? 1 : -1);
            b.vel.y = 200 * (Math.random() * 2 - 1);
            b.vel.len = this.initialSpeed;
        }

        playIcon.style.display = 'none';
        restartIcon.style.display = 'block';
    }

    reset() {
        const b = this.ball;
        b.vel.x = 0;
        b.vel.y = 0;
        b.pos.x = this._canvas.width / 2;
        b.pos.y = this._canvas.height / 2;
    }

    start() {
        requestAnimationFrame(this._frameCallback);
    }

    stop() {
        cancelAnimationFrame(animId);
        this.reset();
        this.resetScore();
        this.start();

        playIcon.style.display = 'block';
        restartIcon.style.display = 'none';
    }

    home() {
        this.stop();

        menu.style.display = 'block';
        field.style.filter = "blur(2px)";
        leftPlayerName.style.display = "none";
        speedBtn.style.display = "none";
        homeIcon.style.display = "none";
        restartIcon.style.display = "none";
        playIcon.style.display = "none";
        changeSpeed(speedNames.easy);
    }

    update(dt) {
        const cvs = this._canvas;
        const ball = this.ball;
        ball.pos.x += ball.vel.x * dt;
        ball.pos.y += ball.vel.y * dt;

        if (ball.right < 0 || ball.left > cvs.width) {
            ++this.players[ball.vel.x < 0 | 0].score;
            this.reset();
        }

        if (ball.vel.y < 0 && ball.top < 0 ||
            ball.vel.y > 0 && ball.bottom > cvs.height) {
            ball.vel.y = -ball.vel.y;
        }

        this.players[1].pos.y = ball.pos.y;

        this.players.forEach(player => {
            player.move(dt);
            this.collide(player, ball);
        });

        this.draw();
    }
    
}
