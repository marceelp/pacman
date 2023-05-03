import { c } from "../app.js";

export class Wall {
  static width = 40;
  static height = 40;

  constructor({ position, image }) {
    this.image = image;
    this.position = position;
    this.width = Wall.width;
    this.height = Wall.height;
    this.image.onload = () => {
      this.position = position;
      this.width = Wall.width;
      this.height = Wall.height;
    };
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export class Interior {
  static width = Wall.width;
  static height = Wall.width;

  constructor({ position, image }) {
    this.image = image;
    this.position = position;
    this.width = Interior.width;
    this.height = Interior.height;
    this.image.onload = () => {
      this.position = position;
      this.width = Interior.width;
      this.height = Interior.height;
    };
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export class Pellet {
  constructor({ position }) {
    this.position = position;
    this.color = "white";
    this.radius = 4;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
}

export class PowerUp {
  constructor({ position }) {
    this.position = position;
    this.color = "white";
    this.radius = 9;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }
}
