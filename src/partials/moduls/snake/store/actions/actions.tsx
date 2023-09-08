export const MOVE_RIGHT = "MOVE_RIGHT";
export const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_UP = "MOVE_UP";
export const MOVE_DOWN = "MOVE_DOWN";

export const RIGHT = "RIGHT";
export const LEFT = "LEFT";
export const UP = "UP";
export const DOWN = "DOWN";

export const SET_DIS_DIRECTION = "SET_DIS_DIRECTION";

export const INCREMENT_SCORE = "INCREMENT_SCORE";
export const INCREASE_SNAKE = "INCREASE_SNAKE";
export const STOP_GAME = "STOP_GAME";

export const RESET = "RESET";
export const RESET_SCORE = "RESET_SCORE";


export interface ISnakeCoord {
  x: number;
  y: number;
}

//Used to set/update the new coordinates of the snake by updating the snake state variable. 
export const makeMove = (dx: number, dy: number, move: string) => ({
  type: move, // is used to specify in which direction will the snake be moving. 
  payload: [dx, dy] //The parameters dx and dy are the deltas. They tell the Redux store by how much we should increase/decrease the coordinates of each snake block to move the snake in the given direction
});

//This action creator will be used to set the disallowedDirection via the SET_DIS_DIRECTION action.
export const setDisDirection = (direction: string) => ({
  type: SET_DIS_DIRECTION, // Action type, that is action constant
  payload: direction //additional data that acts as a payload.
});

export const increaseSnake = () => ({  //action creator
  type: INCREASE_SNAKE
});

export const scoreUpdates = (type: string) => ({
  type
});

export const stopGame = () => ({
  type: STOP_GAME
});

export const resetGame = () => ({
  type: RESET
});