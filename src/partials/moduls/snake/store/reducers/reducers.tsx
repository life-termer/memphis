//For drawing the snake we need to maintain the position of the snake. For that, we can use our global state management tool redux.
//Since we want to track the position of the snake, we will add it into our global state as follows:
//Reducers are functions that return a new global state every time an action is dispatched.
//They take in the current global state and return the new state based on the action that is dispatched/called.  This new state is calculated based on the previous state.
import {
  RIGHT,
  LEFT,
  UP,
  DOWN,
  SET_DIS_DIRECTION,
  INCREASE_SNAKE,
  INCREMENT_SCORE,
  RESET_SCORE,
  RESET
} from "../actions/actions";

interface ISnakeCoord {
  x: number;
  y: number;
}

export interface IGlobalState {
  snake: ISnakeCoord[] | [];
  disallowedDirection: string;
  score: number;
}

const globalState: IGlobalState = {
  //Position of the entire snake
  snake: [
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
  disallowedDirection: "", //keep track of the opposite direction of the snake's movement.
  score: 0,
};

const gameReducer = (state = globalState, action: any) => {
  switch (action.type) {
    case RIGHT:
    case LEFT:
    case UP:
    case DOWN: {
      let newSnake = [...state.snake]; //Copy the coordinates into a new variable called newSnake
      newSnake = [
        {
          //New x and y coordinates by adding the x and y values from the action's payload.
          x: state.snake[0].x + action.payload[0],
          y: state.snake[0].y + action.payload[1],
        },
        ...newSnake,
      ];
      newSnake.pop(); //remove the last entry from the newSnake array.

      return {
        ...state,
        snake: newSnake,
      };
    }

    case SET_DIS_DIRECTION:
      return { ...state, disallowedDirection: action.payload };

    case INCREASE_SNAKE:
      const snakeLen = state.snake.length;
      return {
        ...state,
        snake: [
          ...state.snake,
          {
            x: state.snake[snakeLen - 1].x,
            y: state.snake[snakeLen - 1].y - 2000,
          },
        ],
      };

    case INCREMENT_SCORE:
      return {
        ...state,
        score: state.score + 1,
      };

    case RESET_SCORE:
      return { ...state, score: 0 };

    case RESET:
      return {
        ...state,
        snake: [
          { x: 580, y: 300 },
          { x: 560, y: 300 },
          { x: 540, y: 300 },
          { x: 520, y: 300 },
          { x: 500, y: 300 },
        ],
        disallowedDirection: "",
      };

    default:
      return state;
  }
};

export default gameReducer;
