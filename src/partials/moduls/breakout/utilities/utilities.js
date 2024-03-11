import { Paddle } from "../components/paddle";
import { Ball } from "../components/ball";
import { Brick } from "../components/brick";
import { setDelay } from "../../snake/store/sagas/sagas";

const width = 890;
const height = 400;
export const paddle = new Paddle();
export const ball = new Ball();
let bricks = [];
const colors=["#00b2f9","#01f85c","#2dfa22","#10f504","#f95323","#e7112b"];


export const createBricks = (bricks, w, h) => {
  
  let ratio = w/width;
  let brickX = 2;
  let brickY = 10 * ratio;
  let color = 5;
  let bW = (w/10) - ratio - 1.25;
  let bricksAmount = 60;
  for( let i = 0; i < bricksAmount; i++) {
    if(i <= 20) {
      bricks.push(
        new Brick(brickX, brickY, bW, h / 40, color, 3)
      )
    }
    else if(i > 20 && i < 50) {
      bricks.push(
        new Brick(brickX, brickY, bW, h / 40, color, 2)
      )
    }
    else {
      bricks.push(
        new Brick(brickX, brickY, bW, h / 40, color, 1)
      )
    }
    brickX += bW + ratio + 1;
    if(brickX + bW + ratio + 1 > w){
      brickY += (h / 40 + ratio + 1);
      brickX = 2;
      color--;
    }
  }
}

createBricks(bricks, width, height);

// if ball touch brick destroy
const destroyBrick = (props) => {
  for(var i = 0; i < bricks.length; i++){
    let x = i;
    if(checkCollision(ball, bricks[i])){
      ball.speedY = -ball.speedY;
      if(bricks[i].life == 1) {
        bricks[i].color = 0;
      }
      if(bricks[i].life == 2) bricks[i].color = 1;
      
      if(bricks[i].life == 0) {
        if(bricks[i].collisions == 1) {
          props.setScore(ref => ref + 20);
        } else 
        if(bricks[i].collisions == 2) {
          props.setScore(ref => ref + 50);
        } else props.setScore(ref => ref + 100);
        bricks.splice(i, 1);
      // createBonus(bricks[i]);
      }
    }
  }
}
const checkCollision = (ball, brick) => {
  var distX = Math.abs(ball.x - brick.x-brick.w/2);
  var distY = Math.abs(ball.y - brick.y-brick.h/2);
  if (distX > (brick.w/2 + ball.radius)) { return false; }
  if (distY > (brick.h/2 + ball.radius)) { return false; }
  if (distX <= (brick.w/2)) { brick.collisions++; brick.life--; return true; } 
  if (distY <= (brick.h/2)) { brick.collisions++; brick.life--; return true; }
  var dx=distX-brick.w/2;
  var dy=distY-brick.h/2;
  if(dx*dx+dy*dy<=(ball.radius*ball.radius)) {
    brick.collisions++;
    brick.life--;
    return true;
  }
}

function shake(ctx, brick, level, x, y) {
  ctx.save();
  var dx = Math.random() * level;
  var dy = Math.random() * level;
  ctx.translate(dx, dy);
  ctx.fillStyle = colors[brick.color];  ;    
  ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
  ctx.restore();
}

export const draw = (ctx, props) => {
  
  ctx.clearRect(0, 0, props.width, props.height);
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, props.width, props.height);
  // paddle
  ctx.fillStyle = "#89ddff";  
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
   // ball
  ctx.fillStyle = "#f6929e"; 
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  
  ctx.fill();
  ctx.save();
  //bricks
  for(var i = 0; i < bricks.length; i++){
    if(bricks[i].collisions > 0) {
      shake(ctx, bricks[i], 2);
      var x = i;
      setTimeout(function() {
        if(bricks[x]) bricks[x].collisions--;
    }, 150);
    } else {
      ctx.fillStyle = colors[bricks[i].color];    
      ctx.fillRect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
    }
   }
}

export const move = (keys, props) => {
  if ((keys.isPressed(65) || keys.isPressed(37)) && paddle.x > 0) { // LEFT
    paddle.x -= paddle.speed;
  } else if ((keys.isPressed(68) || keys.isPressed(39)) && (paddle.x + paddle.w) < props.width) { // RIGHT
    paddle.x += paddle.speed;
  }
  // start ball on space key
  if(keys.isPressed(32) && !props.isGameOn){
    // resetGame(ball, paddle, props.width, props.height, props);
    props.setIsGameOn(true)
    props.setGameState(0)
  }
  if(props.isGameOn){
    destroyBrick(props);
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    // check ball hit ceiling
    if(ball.y <= 0){           
      ball.speedY = -ball.speedY;
    }
    // check ball hit wall left-right
    if(ball.x >= props.width || ball.x <= 0){
      ball.speedX = -ball.speedX;
    }
    // check ball hit paddle and angle
    if(ball.y + ball.radius >= paddle.y &&
      ball.x-ball.radius >= paddle.x - 10 &&
      ball.x+ball.radius <= paddle.x + paddle.w + 10 ){
        ball.speedY = -ball.speedY;
     let deltaX = ball.x - (paddle.x + paddle.w / 2)
     ball.speedX = deltaX * 0.15;
    //  ball.speedY = deltaX / 10;
   }
   // check if lost
   if(ball.y > props.height){
    // ball.speedY = -ball.speedY;
    props.setGameState(1);
    props.setIsGameOn(false);
    resetGame(ball, paddle, props.width, props.height, props);
    }
  }
}

export const resetGame = (ball, paddle, w, h, props) => {
  bricks =[];
  ball.x = (w / 2)-3;
  ball.y = (h  / 2)-3;
  ball.speedX = 0;
  ball.speedY = 6 * w/width;
  ball.radius = 6 * w/width;
  paddle.w = 100 * w/width;
  paddle.h = 10 * w/width;
  paddle.speed = 6 * w/width;
  paddle.x = w / 2 - (100 * w/width/2);
  paddle.y = h - 20 * h/height;
  if(props) {
    props.setIsGameOn(false);    
    props.setGameLevel(1);
    props.setScore(0);
  }  
  createBricks(bricks, w, h);
}



//object that helps track pressed keys and provides functionality to check if a 
//specific key is currently pressed and to listen for key presses.
function KeyListener() {
  this.pressedKeys = []; //store the status of each key. Initially, all keys are considered unpressed.
  this.keydown = function(e) { this.pressedKeys[e.keyCode] = true }; //This method is called when a key is pressed. It updates the pressedKeys array to indicate that the key with the corresponding keycode is pressed.
  this.keyup = function(e) { this.pressedKeys[e.keyCode] = false }; //This method is called when a key is released. It updates the pressedKeys array to indicate that the key with the corresponding keycode is released.
  
  //It registers event listeners for keydown and keyup events on the document, binding the this context to the KeyListener instance 
  //using .bind(this) to ensure that this refers to the KeyListener instance within the event handlers.
  document.addEventListener("keydown", this.keydown.bind(this));
  document.addEventListener("keyup", this.keyup.bind(this));
}
//This method checks whether the specified key is currently pressed. 
//It returns true if the key is pressed and false otherwise.
KeyListener.prototype.isPressed = function(key){
  return this.pressedKeys[key] ? true : false;
};
//This method adds an event listener for the key press event (keypress) on the document. 
//When the specified key (keyCode) is pressed, it invokes the provided callback function.
KeyListener.prototype.addKeyPressListener =
  function(keyCode, callback){
  document.addEventListener("keypress", function(e) {
    if (e.keyCode == keyCode)
      callback(e);
  });
}; 

export var keys = new KeyListener();