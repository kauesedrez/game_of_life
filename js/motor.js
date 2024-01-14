class Game {
  constructor() {
    this.x = 1000;
    this.y = 600;
    this.step = 10;
    this.arr = new Array();
    this.arr_tmp = new Array();
    this.timer;
    /**@type {HTMLCanvasElement} */
    // @ts-ignore
    const canvas = document.getElementById("box");
    /**@type {CanvasRenderingContext2D} */
    // @ts-ignore
    this.context = canvas.getContext("2d");

    this.fillArr();
    this.initialState();
    this.controls();
  }

  fillArr() {
    for (let a = 0; a < this.x; a += this.step) {
      this.arr[a] = new Array();
      this.arr_tmp[a] = new Array();

      for (let b = 0; b < this.y; b += this.step) {
        this.arr[a][b] = "off";
        this.arr_tmp[a][b] = "off";
      }
    }
  }

  initialState() {
    this.arr[this.step * 6][this.step * 6] = "on";
    this.arr[this.step * 7][this.step * 6] = "on";
    this.arr[this.step * 8][this.step * 6] = "on";
    this.arr[this.step * 8][this.step * 9] = "on";
  }

  controls() {
    document.getElementById("stop")?.addEventListener("click", (e) => {
      clearTimeout(this.timer);
    });
  }

  init() {
    for (let a = 0; a < this.x; a += this.step) {
      for (let b = 0; b < this.y; b += this.step) {
        if (this.arr[a][b] === "off") {
          this.drawDead(a, b);
        } else {
          this.drawLive(a, b);
        }
      }
    }
  }

  lifeCycle() {
    this.context.clearRect(0, 0, this.x, this.y);

    for (let a = 0; a < this.x; a += this.step) {
      for (let b = 0; b < this.y; b += this.step) {
        let points = 0;
        try {
          if (this.arr[a - this.step][b - this.step] === "on") points += 1;
        } catch (e) {}

        try {
          if (this.arr[a][b - this.step] === "on") points += 1;
        } catch (e) {}

        try {
          if (this.arr[a + this.step][b - this.step] === "on") points += 1;
        } catch (e) {}

        try {
          if (this.arr[a - this.step][b] === "on") points += 1;
        } catch (e) {}

        try {
          if (this.arr[a + this.step][b] === "on") points += 1;
        } catch (e) {}

        try {
          if (this.arr[a - this.step][b + this.step] === "on") points += 1;
        } catch (e) {}

        try {
          if (this.arr[a][b + this.step] === "on") points += 1;
        } catch (e) {}

        try {
          if (this.arr[a + this.step][b + this.step] === "on") points += 1;
        } catch (e) {}

        // regra
        switch (points) {
          case 0:
            this.drawDead(a, b);
            break;

          case 1:
            this.drawDead(a, b);
            break;

          case 2:
            this.drawLive(a, b);
            break;

          case 3:
            this.drawDead(a, b);
            break;

          case 4:
            this.drawDead(a, b);
            break;

          case 5:
            this.drawDead(a, b);
            break;

          case 6:
            this.drawDead(a, b);
            break;

          case 7:
            this.drawDead(a, b);
            break;

          case 8:
            this.drawDead(a, b);
            break;
        }
      }
    }

    this.arr = JSON.parse(JSON.stringify(this.arr_tmp));

    this.timer = setTimeout(() => {
      this.lifeCycle();
    }, 1000);
  }

  drawLive(a, b) {
    this.context.fillStyle = "yellow";
    this.context.fillRect(a, b, this.step, this.step);
    this.arr_tmp[a][b] = "on";
  }

  drawDead(a, b) {
    this.context.strokeStyle = "#333";
    this.context.strokeRect(a, b, this.step, this.step);
    this.arr_tmp[a][b] = "off";
  }

  //
}

let game = new Game();
game.init();
game.lifeCycle();
