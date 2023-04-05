import { Controls } from "./assets/controls.js";
import { Player, Ghost } from "./assets/characters.js";
import { Wall, Interior, Pellet, PowerUp } from "./assets/objects.js";
import { map } from "./assets/map.js";
import {
  createImage,
  circleCollidesWithRect,
  rectCollidesWithRect,
  changeGhostImage,
  playerWallCollision,
  scaredGhosts,
  changeDirection,
} from "./assets/helper.js";

export const canvas = document.querySelector("canvas");
export const c = canvas.getContext("2d");
canvas.width = 920;
canvas.height = 520;

const scoreElement = document.querySelector("#score");
const overlayElement = document.querySelector("#overlay");
const resultElement = document.querySelector("#result");
const restartElement = document.getElementById("restart");
setInterval(function () {
  restartElement.style.display =
    restartElement.style.display == "none" ? "block" : "none";
}, 500);

const walls = [];
const pellets = [];
const powerUps = [];
const base = [];

let animationID;
let score = 0;

const controls = new Controls();
const player = new Player({
  position: {
    x: Wall.width + Wall.width / 2,
    y: Wall.height + Wall.height / 2,
  },
  velocity: { x: 0, y: 0 },
  controls,
});

const ghosts = [
  //RED
  new Ghost({
    position: {
      x: Wall.width * 11,
      y: Wall.height * 6,
    },
    velocity: {
      x: Ghost.speed,
      y: 0,
    },
    currentSx: 0,
    currentSy: 0,
  }),

  //CYAN
  new Ghost({
    position: {
      x: Wall.width * 11,
      y: Wall.height * 6,
    },
    velocity: {
      x: 0,
      y: Ghost.speed,
    },
    currentSx: 400,
    currentSy: 0,
  }),

  //PINK
  new Ghost({
    position: {
      x: Wall.width * 11,
      y: Wall.height * 7,
    },
    velocity: {
      x: 0,
      y: Ghost.speed,
    },
    currentSx: 0,
    currentSy: 390,
  }),

  //ORANGE
  new Ghost({
    position: {
      x: Wall.width * 11,
      y: Wall.height * 8,
    },
    velocity: {
      x: 0,
      y: Ghost.speed,
    },
    currentSx: 400,
    currentSy: 390,
  }),
];

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "w":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/pipeTop.png"),
          })
        );
        break;
      case "x":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/pipeRight.png"),
          })
        );
        break;
      case "y":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/pipeBottom.png"),
          })
        );
        break;
      case "z":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/pipeLeft.png"),
          })
        );
        break;
      case "n":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/Corner1.png"),
          })
        );
        break;
      case "o":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/Corner2.png"),
          })
        );
        break;
      case "m":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/Corner3.png"),
          })
        );
        break;
      case "l":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/Corner4.png"),
          })
        );
        break;
      case "-":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/pipeHorizontal.png"),
          })
        );
        break;
      case "|":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/pipeVertical.png"),
          })
        );
        break;
      case "1":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/pipeCorner1.png"),
          })
        );
        break;
      case "2":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/pipeCorner2.png"),
          })
        );
        break;
      case "3":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/pipeCorner3.png"),
          })
        );
        break;
      case "4":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/pipeCorner4.png"),
          })
        );
        break;
      case "b":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/block.png"),
          })
        );
        break;
      case "[":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/capLeft.png"),
          })
        );
        break;
      case "]":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/capRight.png"),
          })
        );
        break;
      case "_":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/capBottom.png"),
          })
        );
        break;
      case "^":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/capTop.png"),
          })
        );
        break;
      case "+":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/pipeCross.png"),
          })
        );
        break;
      case "5":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            color: "blue",
            image: createImage("./assets/img/pipeConnectorTop.png"),
          })
        );
        break;
      case "6":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            color: "blue",
            image: createImage("./assets/img/pipeConnectorRight.png"),
          })
        );
        break;
      case "7":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            color: "blue",
            image: createImage("./assets/img/pipeConnectorBottom.png"),
          })
        );
        break;
      case "8":
        walls.push(
          new Wall({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/pipeConnectorLeft.png"),
          })
        );
        break;
      case ".":
        pellets.push(
          new Pellet({
            position: {
              x: j * Wall.width + Wall.width / 2,
              y: i * Wall.height + Wall.height / 2,
            },
          })
        );
        break;
      case "p":
        powerUps.push(
          new PowerUp({
            position: {
              x: j * Wall.width + Wall.width / 2,
              y: i * Wall.height + Wall.height / 2,
            },
          })
        );
        break;
      case "g":
        base.push(
          new Interior({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/ghostdoor.png"),
          })
        );
        break;
      case "d":
        base.push(
          new Interior({
            position: {
              x: j * Wall.width,
              y: i * Wall.height,
            },
            image: createImage("./assets/img/darkblock.png"),
          })
        );
        break;
    }
  });
});

function animate() {
  animationID = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  document.querySelector("#score-text").style.display = "block";

  //base
  base.forEach((interior) => {
    interior.draw();

    //player collides with base
    if (circleCollidesWithRect({ circle: player, rect: interior, Wall })) {
      player.velocity.x = player.speed;
      player.velocity.y = 0;
    }

    //ghost starts shifted
    ghosts.forEach((ghost) => {
      if (
        ghost.position.x === interior.position.x &&
        ghost.position.y === interior.position.y &&
        !ghost.start
      ) {
        ghost.velocity.x = 0;
        ghost.velocity.y = 0;
      } else if (
        ghost.position.x === interior.position.x &&
        ghost.position.y === interior.position.y &&
        ghost.start
      ) {
        ghost.velocity.x = 0;
        ghost.velocity.y = -2;
      }
    });
  });

  //player-wall collision and direction change
  playerWallCollision(player, walls, Wall);

  //walls
  walls.forEach((wall) => {
    wall.draw();
    //player stops in "corners"
    if (circleCollidesWithRect({ circle: player, rect: wall, Wall })) {
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });

  //pellets
  for (let i = pellets.length - 1; 0 <= i; i--) {
    const pellet = pellets[i];
    pellet.draw();
    if (
      Math.hypot(
        pellet.position.x - player.position.x,
        pellet.position.y - player.position.y
      ) <
      pellet.radius + player.radius
    ) {
      pellets.splice(i, 1);
      score += 10;
      scoreElement.innerHTML = score;
    }

    //pacman eats all pellets
    if (pellets.length === 0) {
      cancelAnimationFrame(animationID);
      setTimeout(() => {
        overlayElement.style.display = "block";
        resultElement.innerHTML = "You win!";
      }, 500);
    }
  }

  //powerUps
  for (let i = powerUps.length - 1; 0 <= i; i--) {
    const powerUp = powerUps[i];
    powerUp.draw();

    //player collects powerUp
    if (
      Math.hypot(
        powerUp.position.x - player.position.x,
        powerUp.position.y - player.position.y
      ) <
      powerUp.radius + player.radius
    ) {
      powerUps.splice(i, 1);
      ghosts.forEach((ghost) => {
        ghost.scared = true;
        //make ghosts run away when scared
        setTimeout(() => {
          scaredGhosts(ghost, player);
        }, 0);
        //ghosts scared for 3.5sec
        setTimeout(() => {
          ghost.scared = false;
        }, 3500);
      });
    }
  }

  //ghosts
  for (let i = ghosts.length - 1; 0 <= i; i--) {
    const ghost = ghosts[i];
    ghost.update();

    //start ghost
    setTimeout(() => {
      ghost.start = true;
    }, i * 7000);

    //ghost touches player
    if (
      circleCollidesWithRect({ circle: player, rect: ghost, Wall }) &&
      !ghost.dead
    ) {
      if (ghost.scared) {
        ghost.image = createImage("./assets/img/darkblock.png");
        ghost.dead = true;
      } else if (!ghost.scared) {
        cancelAnimationFrame(animationID);
        setTimeout(() => {
          overlayElement.style.display = "block";
          resultElement.innerHTML = "You lose!";
        }, 500);
      }
    }

    //change image when changing direction
    changeGhostImage(ghosts, 0, 0, 0, 190, 190, 0, 190, 190, 0); //red
    changeGhostImage(ghosts, 1, 400, 0, 590, 190, 400, 190, 590, 0); //cyan
    changeGhostImage(ghosts, 2, 0, 390, 190, 580, 0, 580, 190, 390); //pink
    changeGhostImage(ghosts, 3, 400, 390, 590, 580, 400, 580, 590, 390); //orange

    //change direction
    const collisions = [];
    walls.forEach((wall) => {
      changeDirection(collisions, ghost, wall, Wall, rectCollidesWithRect);
    });

    if (collisions.length > ghost.prevCollisions.length) {
      ghost.prevCollisions = collisions;
    }

    if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
      if (ghost.velocity.x > 0) ghost.prevCollisions.push("right");
      else if (ghost.velocity.x < 0) ghost.prevCollisions.push("left");
      else if (ghost.velocity.y > 0) ghost.prevCollisions.push("down");
      else if (ghost.velocity.y < 0) ghost.prevCollisions.push("up");

      const pathways = ghost.prevCollisions.filter((collision) => {
        return !collisions.includes(collision);
      });
      const direction = pathways[Math.floor(Math.random() * pathways.length)];

      switch (direction) {
        case "right":
          ghost.velocity.x = ghost.speed;
          ghost.velocity.y = 0;
          break;
        case "left":
          ghost.velocity.x = -ghost.speed;
          ghost.velocity.y = 0;
          break;
        case "down":
          ghost.velocity.y = ghost.speed;
          ghost.velocity.x = 0;
          break;
        case "up":
          ghost.velocity.y = -ghost.speed;
          ghost.velocity.x = 0;
          break;
      }
      ghost.prevCollisions = [];
    }
  }
  player.update();
}
animate();
