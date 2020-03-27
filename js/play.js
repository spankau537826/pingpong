const canvas = document.querySelector('#pong');
const pong = new Pong(canvas);

canvas.addEventListener('click', () => pong.play());

canvas.addEventListener('mousemove', event => {
    const scale = event.offsetY / (event.target.getBoundingClientRect().height);
    pong.players[0].pos.y = scale * canvas.height;
});

pong.start();
