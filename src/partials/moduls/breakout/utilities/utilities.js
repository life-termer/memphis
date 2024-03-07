import { Paddle } from "../components/paddle";
import { Ball } from "../components/ball";
import { Brick } from "../components/brick";

const width = 870;
const height = 400;
export const paddle = new Paddle();
export const ball = new Ball();
let bricks = [];
const colors=["#18582b","#0c905d","#00c78e","#33dbff","#3375ff","#5733ff"];

export const createBricks = (bricks, w, h) => {
  
  let ratio = w/width;
  let brickX = 2;
  let brickY = 10 * ratio;
  let color = 0;
  let bW = (w/10) - ratio - 1.25;
  if(true) {
    for( let i = 0; i < 60; i++) {
      bricks.push(
        new Brick(brickX, brickY, bW, h / 40, colors[color])
      )
      brickX += bW + ratio + 1;
      if(brickX + bW + ratio + 1 > w){
        brickY += (h / 40 + ratio + 1);
        brickX = 2;
        color++;
      }
    }
  }
}

createBricks(bricks, width, height);

// if ball touch brick destroy
const destroyBrick = () => {
  for(var i = 0; i < bricks.length; i++){
    if(checkCollision(ball, bricks[i])){
      ball.speedY = -ball.speedY;
      // createBonus(bricks[i]);
      bricks.splice(i,1);
    }
  }
}

const checkCollision = (obj1, obj2) => {
  if(obj1 != ball){
    if(obj1.y >= obj2.y &&
       obj1.y <= obj2.y + obj2.h &&
       obj1.x >= obj2.x &&
       obj1.x <= obj2.x + obj2.w){
      return true
    }
  }else{
    if(obj1.y + obj1.radius >= obj2.y &&
       obj1.y - obj1.radius <= obj2.y + obj2.h &&
       obj1.x - obj1.radius >= obj2.x &&
       obj1.x + obj1.radius <= obj2.x + obj2.w){
      return true
    }
  }
}

export const draw = (ctx, props) => {
  
  ctx.clearRect(0, 0, props.width, props.height);
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, props.width, props.height);
  // paddle
  ctx.fillStyle = "#fff";    
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
  // ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fill();
  //bricks
  for(var i=0;i<bricks.length;i++){
    ctx.fillStyle = bricks[i].color;    
    ctx.fillRect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
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
      ball.x-ball.radius >= paddle.x &&
      ball.x+ball.radius <= paddle.x+paddle.w){
        ball.speedY = -ball.speedY;
     let deltaX=ball.x - (paddle.x + paddle.w/2)
     ball.speedX = deltaX * 0.15;
   }
   destroyBrick();
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