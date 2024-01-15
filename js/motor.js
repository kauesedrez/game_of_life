// @ts-nocheck
class Game {
  constructor() {
    this.x = 1000;
    this.y = 500;
    this.step = 10;
    this.time = 20;
    this.random_factor = 90;
    this.arr = new Array();
    this.arr_tmp = new Array();
    this.timer;
    /**@type {HTMLCanvasElement} */
    const canvas = document.getElementById("box");
    /**@type {CanvasRenderingContext2D} */
    this.context = canvas.getContext("2d");

    this.offscreenCanvas = document.createElement("canvas");
    this.offscreenCanvas.width = this.x;
    this.offscreenCanvas.height = this.y;
    this.offscreenContext = this.offscreenCanvas.getContext("2d");
    this.offscreenContext.lineWidth = 1;
    this.context.lineWidth = 1;

    this.rules = {
      on: {
        0: "dead",
        1: "dead",
        2: "alive", // conway live
        3: "alive", // conway live
        4: "dead",
        5: "dead",
        6: "dead",
        7: "dead",
        8: "dead",
      },
      off: {
        0: "dead",
        1: "dead",
        2: "dead",
        3: "alive", // conway live
        4: "dead",
        5: "dead",
        6: "dead",
        7: "dead",
        8: "dead",
      },
    };

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
    document.getElementById("next")?.addEventListener("click", (e) => {
      this.lifeCycle(false);
    });
    document.getElementById("rand")?.addEventListener("click", (e) => {
      this.randomize();
    });
    document.getElementById("apply")?.addEventListener("click", (e) => {
      this.applySettings();
    });
  }

  applySettings() {
    const $ = (el) => document.getElementById(el);

    let w = $("width").value;
    let h = $("height").value;
    let step = $("step").value;
    this.step = parseInt(step);
    let time = $("time").value;
    this.time = time;
    let rFactor = $("rFactor").value;
    this.random_factor = rFactor;

    for (let i = 0; i <= 8; i++) {
      let on = $(`on${i}`).value;
      let off = $(`off${i}`).value;
      this.rules.on[i] = on;
      this.rules.off[i] = off;
    }

    $("box").style.width = w + "px";
    $("box").style.height = h + "px";
    $("box").setAttribute("width", w);
    $("box").setAttribute("height", h);
    this.x = w;
    this.y = h;
    this.offscreenCanvas.width = this.x;
    this.offscreenCanvas.height = this.y;
    this.fillArr();
  }

  init() {
    this.context.clearRect(0, 0, this.x, this.y);
    this.offscreenContext.clearRect(0, 0, this.x, this.y);

    for (let a = 0; a < this.x; a += this.step) {
      for (let b = 0; b < this.y; b += this.step) {
        if (this.arr[a][b] === "off") {
          this.drawDead(a, b, "#333");
        } else {
          this.drawAlive(a, b, "yellow");
        }
      }
    }
    this.context.drawImage(this.offscreenCanvas, 0, 0);
  }

  lifeCycle(anim = true) {
    this.context.clearRect(0, 0, this.x, this.y);
    this.offscreenContext.clearRect(0, 0, this.x, this.y);

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

        this.rules[this.arr[a][b]][points] === "dead"
          ? this.drawDead(a, b)
          : this.drawAlive(a, b);

        /*
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
             
          */
      }
    }

    this.context.drawImage(this.offscreenCanvas, 0, 0);

    this.arr = JSON.parse(JSON.stringify(this.arr_tmp));

    if (anim)
      this.timer = setTimeout(() => {
        this.lifeCycle();
      }, this.time);
  }

  generateRandomNumber() {
    // Generates a random number between 0 (inclusive) and 1 (exclusive)
    const decimalNumber = Math.random();

    // Multiplies by the desired range and rounds down
    const integerNumber = Math.floor(decimalNumber * 101);

    return integerNumber;
  }

  randomize() {
    clearTimeout(this.timer);
    for (let a = 0; a < this.x; a += this.step) {
      for (let b = 0; b < this.y; b += this.step) {
        if (this.generateRandomNumber() < this.random_factor) {
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

  drawAlive(a, b, color = "yellow") {
    this.offscreenContext.fillStyle = color;
    this.offscreenContext.fillRect(a, b, this.step, this.step);
    this.arr_tmp[a][b] = "on";
  }

  drawDead(a, b, color = "#333") {
    this.offscreenContext.strokeStyle = color;
    this.offscreenContext.strokeRect(a, b, this.step, this.step);
    this.arr_tmp[a][b] = "off";
  }

  //
}

let game = new Game();
game.init();
