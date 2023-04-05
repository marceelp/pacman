export class Controls {
  constructor() {
    addEventListener("keydown", this.keyDownEvent.bind(this));
    addEventListener("keyup", this.keyUpEvent.bind(this));
    this.lastKey = "";
  }

  keyDownEvent(event) {
    switch (event.key) {
      case "d":
        this.right = true;
        this.lastKey = "d";
        return;

      case "a":
        this.left = true;
        this.lastKey = "a";
        return;

      case "w":
        this.up = true;
        this.lastKey = "w";
        return;

      case "s":
        this.down = true;
        this.lastKey = "s";
        return;

      case " ":
        this.start = true;
        return;
    }
  }

  keyUpEvent(event) {
    switch (event.key) {
      case "d":
        this.right = false;
        return;

      case "a":
        this.left = false;
        return;

      case "w":
        this.up = false;
        return;

      case "s":
        this.down = false;
        return;

      case " ":
        this.start = false;
        return;
    }
  }
}
