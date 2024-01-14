class Game {
  constructor() {
    this.x = 1000;
    this.y = 600;
    this.step = 10;
    this.arr = new Array();
    this.fillArr();
    this.initialState();
  }

  fillArr() {
    for (let a = 0; a < this.x; a += this.step) {
      this.arr[a] = new Array();
      for (let b = 0; b < this.y; b += this.step) {
        this.arr[a][b] = "off";
      }
    }
  }

  initialState() {
    this.arr[this.step * 6][this.step * 6] = "on";
    this.arr[this.step * 7][this.step * 6] = "on";
    this.arr[this.step * 8][this.step * 6] = "on";
    this.arr[this.step * 8][this.step * 9] = "on";
  }

  init() {
    /**@type {HTMLCanvasElement} */
    // @ts-ignore
    const canvas = document.getElementById("box");
    var context = canvas.getContext("2d");
    if (context === null) return;

    for (let a = 0; a < this.x; a += this.step) {
      for (let b = 0; b < this.y; b += this.step) {
        // aqui eu tenho a,b
        if (this.arr[a][b] === "off") {
          context.strokeStyle = "#333";
          context.strokeRect(a, b, this.step, this.step);
        } else {
          context.fillStyle = "yellow";
          context.fillRect(a, b, this.step, this.step);
        }
      }
    }
  }
}

let game = new Game();
game.init();
