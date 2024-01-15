class Game {
  constructor() {
    this.x = 2000;
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
    this.arr[this.step * 8][this.step * 6] = "on";
    this.arr[this.step * 9][this.step * 6] = "on";
    this.arr[this.step * 10][this.step * 6] = "on";
    this.arr[this.step * 8][this.step * 7] = "on";
    this.arr[this.step * 8][this.step * 8] = "on";
    this.arr[this.step * 8][this.step * 10] = "on";
  }

  controls() {
    document.getElementById("pause")?.addEventListener("click", (e) => {
      clearTimeout(this.timer);
    });
    document.getElementById("play")?.addEventListener("click", (e) => {
      this.lifeCycle();
    });
    document.getElementById("rand")?.addEventListener("click", (e) => {
      this.randomize();
    });
  }

  init() {
    this.context.clearRect(0, 0, this.x, this.y);

    for (let a = 0; a < this.x; a += this.step) {
      for (let b = 0; b < this.y; b += this.step) {
        if (this.arr[a][b] === "off") {
          this.drawDead(a, b, "#333");
        } else {
          this.drawLive(a, b, "yellow");
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

        if (this.arr[a][b] === "on")
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
              this.drawLive(a, b);
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

        if (this.arr[a][b] === "off")
          switch (points) {
            case 3:
              this.drawLive(a, b);
              break;

            default:
              this.drawDead(a, b);
              break;
          }
      }
    }

    this.arr = JSON.parse(JSON.stringify(this.arr_tmp));

    this.timer = setTimeout(() => {
      this.lifeCycle();
    }, 20);
  }

  generateRandomNumber() {
    // Generates a random number between 0 (inclusive) and 1 (exclusive)
    const decimalNumber = Math.random();

    // Multiplies by the desired range and rounds down
    const integerNumber = Math.floor(decimalNumber * 10) + 1;

    return integerNumber;
  }

  randomize() {
    clearTimeout(this.timer);
    for (let a = 0; a < this.x; a += this.step) {
      for (let b = 0; b < this.y; b += this.step) {
        if (this.generateRandomNumber() < 9) {
          this.arr[a][b] = "off";
          this.arr_tmp[a][b] = "off";
        } else {
          this.arr[a][b] = "on";
          this.arr_tmp[a][b] = "on";
        }
      }
    }
    this.init();
  }

  drawLive(a, b, color = "yellow") {
    this.context.fillStyle = color;
    this.context.fillRect(a, b, this.step, this.step);
    this.arr_tmp[a][b] = "on";
  }

  drawDead(a, b, color = "#333") {
    this.context.strokeStyle = color;
    this.context.strokeRect(a, b, this.step, this.step);
    this.arr_tmp[a][b] = "off";
  }

  //
}

let game = new Game();
game.init();
