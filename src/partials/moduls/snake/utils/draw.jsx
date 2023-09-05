import BindEvents from "./bindEvents";

export default function Draw (ctx, x , y, blockSize, posArray, frameCount, speed, snakeDirection) {
  
  ctx.save();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);//clear the canvas
  
  ctx.fillStyle = "#000";
  for(var i = 0; i < posArray.current.length; i++) {
    drawSection(ctx, posArray[i], blockSize);
  }
  // ctx.fillRect(x, y, sWidth, sHeight);//a moving snake
  ctx.restore();
  // if(frameCount / speed % 10 === 0)
  //   advance(posArray, snakeDirection);
};

function drawSection(ctx, position, blockSize) {
  var x = blockSize * position[0];
  var y = blockSize * position[1];
  ctx.fillRect(x, y, blockSize, blockSize);
}

function advance(posArray, direction) {
  var nextPosition = posArray[0].slice(); //copy head of snake
  switch (direction) {
    case 'left':
      nextPosition[0] -= 1;
      break;
    case 'up':
      nextPosition[1] -= 1;
      break;
    case 'right':
      nextPosition[0] += 1;
      break;
    case 'down':
      nextPosition[1] += 1;
      break;
    default:
      throw('Invalid direction');
    }
  // nextPosition[0] += 1; //add 1 to the x position

  //add the new position to the beginning of the array
  posArray.unshift(nextPosition);
  //and remove the last position
  posArray.pop();
}