import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from 'axios';
import { createCookie } from "../../../utilities/cookies";

import { useSelector, useDispatch } from "react-redux";
import { IGlobalState } from "../store/reducers/reducers";
import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  makeMove,
  increaseSnake,
  INCREMENT_SCORE,
  scoreUpdates,
  stopGame,
  RESET_SCORE,
  resetGame,
} from "../store/actions/actions";
import {
  clearBoard,
  drawObject,
  generateRandomPosition,
  IObjectBody,
  hasSnakeCollided,
} from "../utilities/utils";
import Rules from "./rules";
import GameOver from "./gameOver";

export interface ICanvasBoard {
  height: number;
  width: number;
  bestScore: number;
  setBestScore: any;
  showRules: boolean;
  setShowRules: any;
  fetchScore: any;
}

const CanvasBoard = ({ height, width, bestScore, setBestScore, showRules, setShowRules, fetchScore }: ICanvasBoard) => {
  const dispatch = useDispatch();
  const serverURL = process.env.REACT_APP_SERVER_URL;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const snake1 = useSelector((state: IGlobalState) => state.snake); //use the useSelector hook of react-redux to get the required state from the store. The following will give us the snake's global state:
  const score = useSelector((state: IGlobalState) => state.score);
  const disallowedDirection = useSelector(
    (state: IGlobalState) => state.disallowedDirection
  );
  const [pos, setPos] = useState<IObjectBody>(
    generateRandomPosition(width - 20, height - 20)
  );
  const [isConsumed, setIsConsumed] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [isBestScore, setIsBestScore] = useState<boolean>(false);
  
  const moveSnake = useCallback(
    //function that dispatches an action passed to the makeMove action creator.
    (dx = 0, dy = 0, ds: string) => {
      if (dx > 0 && dy === 0 && ds !== "RIGHT") {
        dispatch(makeMove(dx, dy, MOVE_RIGHT));
      }

      if (dx < 0 && dy === 0 && ds !== "LEFT") {
        dispatch(makeMove(dx, dy, MOVE_LEFT));
      }

      if (dx === 0 && dy < 0 && ds !== "UP") {
        dispatch(makeMove(dx, dy, MOVE_UP));
      }

      if (dx === 0 && dy > 0 && ds !== "DOWN") {
        dispatch(makeMove(dx, dy, MOVE_DOWN));
      }
    },
    [dispatch]
  );

  const handleKeyEvents = useCallback(
    
    //useCallback hook memoize version of this function which is called on every state change (that is, on the change of disallowedDirection and moveSnake).  This function is called on every key pressed on the keyboard.
    (event: KeyboardEvent) => {
      if (disallowedDirection) {
        switch (event.key) {
          case "w":
            moveSnake(0, -20, disallowedDirection);
            break;
          case "s":
            moveSnake(0, 20, disallowedDirection);
            break;
          case "a":
            moveSnake(-20, 0, disallowedDirection);
            break;
          case "d":
            event.preventDefault();
            moveSnake(20, 0, disallowedDirection);
            break;
          case " ":
            resetBoard();
            break;
        }
      } else {
        //If the disallowedDirection is empty then we make sure that the game will start only when the user presses the d key
        if (
          disallowedDirection !== "LEFT" &&
          disallowedDirection !== "UP" &&
          disallowedDirection !== "DOWN" &&
          event.key === "d"
        ) {
          setShowRules(false);
          moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
        }
      }
    },
    [disallowedDirection, moveSnake]
  );

  const resetBoard = useCallback(() => {
    window.removeEventListener("keypress", handleKeyEvents);
    dispatch(resetGame());
    dispatch(scoreUpdates(RESET_SCORE));
    setIsBestScore(false);
    clearBoard(context);
    drawObject(context, snake1, "#91C483");
    const posi = generateRandomPosition(width - 20, height - 20);
    setPos(posi);
    drawObject(context, [pos], "#730312", "#730312"); //Draws object randomly
    window.addEventListener("keypress", handleKeyEvents);
  }, [context, dispatch, handleKeyEvents, height, snake1, width]);

  useEffect(() => {
    //Generate new object
    if (isConsumed) {
      setIsConsumed(false);

      //Increase snake size when object is consumed successfully
      dispatch(increaseSnake());
      //Increment the score
      dispatch(scoreUpdates(INCREMENT_SCORE));
    }
  }, [isConsumed, height, width, dispatch]);


  const setRecord = (record: number, currentScore: number) => {
    if(currentScore > record) {
      if(serverURL) {
        //Send PUT request to 'books/reset' endpoint
        axios
        .put(process.env.REACT_APP_SERVER_URL + '/snake/reset')

        //Send POST request to 'books/create' endpoint
        axios
          .post(process.env.REACT_APP_SERVER_URL + '/snake/create', {
            bscore: currentScore,
          })
          .then(() => {
            //Fetch score to refresh
            fetchScore();
            
          })
      } else {
        setBestScore(currentScore);
        createCookie("bestScoreSnake", currentScore, 3650);
      }
      
      setIsBestScore(true);
    }
  }

  useEffect(() => {
    //Draw on canvas each time
    setContext(canvasRef.current && canvasRef.current.getContext("2d")); //store in state variable
    clearBoard(context);
    drawObject(context, snake1, "#91C483"); //Draws snake at the required position
    drawObject(context, [pos], "#730312", "#730312"); //Draws fruit randomly
    //When the fruit is consumed
    if (snake1[0].x === pos?.x && snake1[0].y === pos?.y) {
      //check if the head of the snake snake[0] is equal to the pos, or the position of the fruit.
      setIsConsumed(true);
      const posi = generateRandomPosition(width - 20, height - 20);
      setPos(posi);
    }
    if (
      //Checks if the snake has collided with itself
      hasSnakeCollided(snake1, snake1[0]) ||
      //Checks if the snake head is out of the boundaries of the box
      snake1[0].x >= width ||
      snake1[0].x <= 0 - 20 ||
      snake1[0].y <= 0 - 20 ||
      snake1[0].y >= height
    ) {
      setGameEnded(true);
      dispatch(stopGame());
      window.removeEventListener("keypress", handleKeyEvents);
      setRecord(bestScore, score);
    } else setGameEnded(false);
  }, [context, snake1, pos, height, width, dispatch, handleKeyEvents, gameEnded]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyEvents);

    return () => {
      window.removeEventListener("keypress", handleKeyEvents);
    };
  }, [disallowedDirection, handleKeyEvents]);
  
  return (
    <div className="content-canvas">
      <div className="active-button" onClick={() => resetBoard()}>Reset</div>
      <canvas ref={canvasRef} height={height} width={width} />
      { showRules ? (<Rules />) : ("") }
      { gameEnded ? (<GameOver score={score} bestScore={bestScore} isBestScore={isBestScore} />) : ("") }
    </div>
  );
};
export default CanvasBoard;
