class Player extends GameObject {
    constructor() {
        super(20, 100);
        this.vel = new Vec;
        this.score = 0;

        this._lastPos = new Vec;
    }

    move(dt) {
        this.vel.y = (this.pos.y - this._lastPos.y) / dt;
        this._lastPos.y = this.pos.y;
    }
}
