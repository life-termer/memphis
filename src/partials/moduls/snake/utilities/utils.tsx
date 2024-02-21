//Function for clear the canvas
export const clearBoard = (context: CanvasRenderingContext2D | null) => {
  //It accepts the 2d canvas context objects as an argument.
  if (context) {
    context.clearRect(0, 0, 1000, 600); 
  }
};

//Function for drawing an object onto the canvas
export interface IObjectBody {
  x: number;
  y: number;
}

export const drawObject = (
  context: CanvasRenderingContext2D | null, //A 2D canvas context object for drawing the object on the canvas.
  objectBody: IObjectBody[], //Array of objects with each object having x and y properties, like the IObjectBody interface.
  fillBodyColor: string, //Color to be filled inside the object.
  fillHeadColor = "#021406",
  strokeStyle = "#146356" //Color to be filled in the outline of the object. Defaults to #146356.
) => {
  if (context) {
    let cnt = 0;
    objectBody.forEach((object: IObjectBody) => {
      if(cnt === 0) {
        cnt++;
        context.fillStyle = fillHeadColor;
        context.strokeStyle = strokeStyle;
        context?.fillRect(object.x, object.y, 20, 20); //Create a filled rectangle with coordinates object.x and object.y with size 20x20
        context?.strokeRect(object.x, object.y, 20, 20); //Create an outlined rectangle with coordinates object.x and object.y with size 20x20
      }
      else {
        context.fillStyle = fillBodyColor;
        context.strokeStyle = strokeStyle;
        context?.fillRect(object.x, object.y, 20, 20); //Create a filled rectangle with coordinates object.x and object.y with size 20x20
        context?.strokeRect(object.x, object.y, 20, 20); //Create an outlined rectangle with coordinates object.x and object.y with size 20x20
      }
      
    });
  }
};

//function that will generate random x and y coordinates in multiples of 20. These coordinates will always be less than the width and height of the board. It accepts width and height as arguments.
function randomNumber(min: number, max: number) {
  let random = Math.random() * max;
  return random - (random % 20);
}

export const generateRandomPosition = (width: number, height: number) => {
  return {
    x: randomNumber(0, width),
    y: randomNumber(0, height),
  };
};

export const hasSnakeCollided = (
  snake: IObjectBody[],
  currentHeadPos: IObjectBody
) => {
  let flag = false;
  snake.forEach((pos: IObjectBody, index: number) => {
    if (
      pos.x === currentHeadPos.x &&
      pos.y === currentHeadPos.y &&
      index !== 0
    ) {
      flag = true;
    }
  });

  return flag;
};

