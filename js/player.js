class Object {
    constructor(x,y,color) {
      this.x = x;
      this.y = y;
      this.color = color;
    }
  }

class Player extends Object {
    draw() {
        drawRect(this.x,this.y,20,100,this.color);
    }

    move(y) {
        this.y = y;
        this.update();
    }

    update() {
        drawRect(this.x,this.y,20,100,this.color);
    }

    clear(c,oldX,oldY) {
        c.clearRect(oldX - 1,oldY - 1,30,110,this.color);
    }
}