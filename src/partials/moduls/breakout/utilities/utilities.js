import { Paddle } from "../components/paddle";
import { Ball } from "../components/ball";
import { Brick } from "../components/brick";

const width = 890;
const height = 400;
export const paddle = new Paddle();
export const ball = new Ball();
const bonus = [];
let bricks = [];
const colors = [
  "#00b2f9",
  "#01f85c",
  "#2dfa22",
  "#10f504",
  "#f95323",
  "#e7112b",
];

export const createBricks = (bricks, w, h, props) => {
  let ratio = w / width;
  let brickX = 2;
  let brickY = 10 * ratio;
  let color = 1;
  let bW = w / 10 - ratio - 1.25;
  let bricksAmount = 30;
  if (props && props.gameLevel === 3) {
    bricksAmount = 50;
    color = 5;
  } else if (props && props.gameLevel === 2) {
    bricksAmount = 70;
    color = 4;
  }
  for (let i = 0; i < bricksAmount; i++) {
    if (props && props.gameLevel === 3) {
      if (i < 20) {
        bricks.push(new Brick(brickX, brickY, bW, h / 40, color, 3));
      } else if (i >= 20 && i < 50) {
        bricks.push(new Brick(brickX, brickY, bW, h / 40, color, 2));
      } else {
        bricks.push(new Brick(brickX, brickY, bW, h / 40, color, 1));
      }
    } else if (props && props.gameLevel === 2) {
      if (i <= 10) {
        bricks.push(new Brick(brickX, brickY, bW, h / 40, color, 3));
      } else if (i >= 10 && i < 30) {
        bricks.push(new Brick(brickX, brickY, bW, h / 40, color, 2));
      } else {
        bricks.push(new Brick(brickX, brickY, bW, h / 40, color, 1));
      }
    } else {
      if (i < 10) {
        bricks.push(new Brick(brickX, brickY, bW, h / 40, color, 2));
      } else {
        bricks.push(new Brick(brickX, brickY, bW, h / 40, color, 1));
      }
    }
    brickX += bW + ratio + 1;
    if (brickX + bW + ratio + 1 > w) {
      brickY += h / 40 + ratio + 1;
      brickX = 2;
      if (color >= 0) color--;
      if(props && props.gameLevel === 2 && color === 1) color = 0;
    }
  }
};

const createBonus = (brick) => {
  var chance = Math.random();
  if (chance < 0.4) {
    // if (true) {
    let type = Math.floor(Math.random() * (0 - 7 + 1) + 7); //random number between 1-6
    let color = Math.floor(Math.random() * (0 - 7 + 1) + 7);
    let b = {
      x: brick.x + brick.w / 2 - 5,
      y: brick.y,
      w: brick.h,
      h: brick.h,
      type: type,
      color: color,
    };
    bonus.push(b);
  }
};
createBricks(bricks, width, height);

// if ball touch brick destroy
const destroyBrick = (props) => {
  for (var i = 0; i < bricks.length; i++) {
    if (checkCollision(ball, bricks[i])) {
      createBonus(bricks[i]);
      ball.speedY = -ball.speedY;
      if (bricks[i].life == 1) {
        bricks[i].color = 0;
      }
      if (bricks[i].life == 2) bricks[i].color = 1;

      if (bricks[i].life == 0) {
        if (bricks[i].collisions == 1) {
          props.setScore((ref) => ref + 20);
        } else if (bricks[i].collisions == 2) {
          props.setScore((ref) => ref + 50);
        } else props.setScore((ref) => ref + 100);
        bricks.splice(i, 1);
      }
    }
  }
};
const checkCollision = (ball, brick) => {
  var distX = Math.abs(ball.x - brick.x - brick.w / 2);
  var distY = Math.abs(ball.y - brick.y - brick.h / 2);
  if (distX > brick.w / 2 + ball.radius) {
    return false;
  }
  if (distY > brick.h / 2 + ball.radius) {
    return false;
  }
  if (distX <= brick.w / 2) {
    brick.collisions++;
    brick.life--;
    return true;
  }
  if (distY <= brick.h / 2) {
    brick.collisions++;
    brick.life--;
    return true;
  }
  var dx = distX - brick.w / 2;
  var dy = distY - brick.h / 2;
  if (dx * dx + dy * dy <= ball.radius * ball.radius) {
    brick.collisions++;
    brick.life--;
    return true;
  }
};
const checkBonusCollision = (bonus, paddle) => {
  if (
    bonus.y >= paddle.y &&
    bonus.y <= paddle.y + paddle.h &&
    bonus.x >= paddle.x &&
    bonus.x <= paddle.x + paddle.w
  ) {
    return true;
  } else return false;
};

function shake(ctx, brick, level, x, y) {
  ctx.save();
  var dx = Math.random() * level;
  var dy = Math.random() * level;
  ctx.translate(dx, dy);
  ctx.fillStyle = colors[brick.color];
  ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
  ctx.restore();
}
function rotate(ctx, brick) {
  let x = brick.x + brick.w / 2;
  let y = brick.y + brick.h / 2;
  ctx.save();
  ctx.translate(x, y);
  const time = new Date();
  ctx.rotate(
    (((2 * Math.PI) / 60) * time.getSeconds() +
      ((2 * Math.PI) / 60000) * time.getMilliseconds()) *
      100
  );
  ctx.translate(-x, -y);
  ctx.fillStyle = colors[brick.color];
  ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
  ctx.restore();
}

export const draw = (ctx, props, color) => {
  ctx.clearRect(0, 0, props.width, props.height);
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, props.width, props.height);
  // paddle
  ctx.fillStyle = "#89ddff";
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
  // ball
  ctx.fillStyle = "#f6929e";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);

  ctx.fill();
  ctx.save();
  //bricks
  for (var i = 0; i < bricks.length; i++) {
    if (bricks[i].collisions > 0) {
      shake(ctx, bricks[i], 2);
      var x = i;
      setTimeout(function () {
        if (bricks[x]) {
          bricks[x].collisions--;
        }
      }, 150);
    } else {
      ctx.fillStyle = colors[bricks[i].color];
      ctx.fillRect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
    }
  }
  //bonus
  for (var i = 0; i < bonus.length; i++) {
    rotate(ctx, bonus[i]);
  }
};

export const move = (keys, props) => {
  if (
    (keys.isPressed(65) || keys.isPressed(37)) &&
    paddle.x > 0 &&
    props.isGameOn
  ) {
    // LEFT
    paddle.x -= paddle.speed;
  } else if (
    (keys.isPressed(68) || keys.isPressed(39)) &&
    paddle.x + paddle.w < props.width &&
    props.isGameOn
  ) {
    // RIGHT
    paddle.x += paddle.speed;
  }
  // start ball on space key
  if (keys.isPressed(32) && !props.isGameOn) {
    resetGame(ball, paddle, props.width, props.height, props);
    props.setIsGameOn(true);
  }
  if (props.isGameOn) {
    destroyBrick(props);
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    // check ball hit ceiling
    if (ball.y <= 0) {
      ball.speedY = -ball.speedY;
    }
    // check ball hit wall left-right
    if (ball.x >= props.width || ball.x <= 0) {
      ball.speedX = -ball.speedX;
    }
    // check ball hit paddle and angle
    if (
      ball.y + ball.radius >= paddle.y &&
      ball.x - ball.radius >= paddle.x - 10 &&
      ball.x + ball.radius <= paddle.x + paddle.w + 10
    ) {
      ball.speedY = -ball.speedY;
      let deltaX = ball.x - (paddle.x + paddle.w / 2);
      if (deltaX > 30) deltaX = 30;
      if (deltaX < -30) deltaX = -30;
      ball.speedX = deltaX * 0.15;
    }
    //bonus movement
    for (var i = 0; i < bonus.length; i++) {
      bonus[i].y += paddle.speed - 3;
      if (checkBonusCollision(bonus[i], paddle)) {
        switch (bonus[i].type) {
          case 1:
            ball.radius += 1;
            props.setBonus("Larger ball");
            break;
          case 2:
            if (ball.speedY > 0) ball.speedY += 0.5;
            else ball.speedY -= 0.5;
            props.setBonus("Ball speed up");
            break;
          case 3:
            if (ball.speedY >= 2) ball.speedY -= 0.5;
            else if (ball.speedY <= -2) ball.speedY += 0.5;
            props.setBonus("Ball speed down");
            break;
          case 4:
            if (paddle.w < (width * 100) / 50) {
              paddle.w += 20;
            }
            props.setBonus("More paddle length");
            break;
          case 5:
            if (paddle.w > 70) {
              paddle.w -= 20;
            }
            props.setBonus("Less paddle length");
            break;
          case 6:
            props.setScore((ref) => ref + 200);
            props.setBonus("Score +200");
            break;
        }
        bonus.splice(i, 1);
        setTimeout(() => {
          props.setBonus();
        }, 1000);
        return;
      }
      if (bonus[i].y > props.height) {
        bonus.splice(i, 1);
      }
    }
    // check if lost
    if (ball.y > props.height) {
      props.setGameState(1);
      props.setGameLevel(1);
      props.setIsGameOn(false);
    }
    //check if won
    if (bricks.length < 1) {
      if (props.gameLevel != 3) {
        props.gameLevel === 1 ? props.setGameLevel(2) : props.setGameLevel(3); 
        props.setGameState(2);
        props.setIsGameOn(false);
      }else {
        props.setGameState(3);
        props.setIsGameOn(false);
      }
    }
  }
};

export const resetGame = (ball, paddle, w, h, props) => {
  bricks = [];
  ball.x = w / 2 - 3;
  ball.y = h / 2 - 3;
  ball.speedX = 0;
  ball.speedY = (6 * w) / width;
  ball.radius = (6 * w) / width;
  paddle.w = (100 * w) / width;
  paddle.h = (10 * w) / width;
  paddle.speed = (6 * w) / width;
  paddle.x = w / 2 - (100 * w) / width / 2;
  paddle.y = h - (20 * h) / height;
  if (props) {
    props.setBonus();
    props.setIsGameOn(false);
    if(props.gameState === 3) {
      props.setGameLevel(1);
    }
  }
  createBricks(bricks, w, h, props);
};

//object that helps track pressed keys and provides functionality to check if a
//specific key is currently pressed and to listen for key presses.
function KeyListener() {
  this.pressedKeys = []; //store the status of each key. Initially, all keys are considered unpressed.
  this.keydown = function (e) {
    this.pressedKeys[e.keyCode] = true;
  }; //This method is called when a key is pressed. It updates the pressedKeys array to indicate that the key with the corresponding keycode is pressed.
  this.keyup = function (e) {
    this.pressedKeys[e.keyCode] = false;
  }; //This method is called when a key is released. It updates the pressedKeys array to indicate that the key with the corresponding keycode is released.

  //It registers event listeners for keydown and keyup events on the document, binding the this context to the KeyListener instance
  //using .bind(this) to ensure that this refers to the KeyListener instance within the event handlers.
  document.addEventListener("keydown", this.keydown.bind(this));
  document.addEventListener("keyup", this.keyup.bind(this));
}
//This method checks whether the specified key is currently pressed.
//It returns true if the key is pressed and false otherwise.
KeyListener.prototype.isPressed = function (key) {
  return this.pressedKeys[key] ? true : false;
};
//This method adds an event listener for the key press event (keypress) on the document.
//When the specified key (keyCode) is pressed, it invokes the provided callback function.
KeyListener.prototype.addKeyPressListener = function (keyCode, callback) {
  document.addEventListener("keypress", function (e) {
    if (e.keyCode == keyCode) callback(e);
  });
};

export var keys = new KeyListener();
