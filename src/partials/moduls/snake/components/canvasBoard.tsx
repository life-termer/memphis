import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IGlobalState,  } from "../store/reducers/reducers";
import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, makeMove } from "../store/actions/actions";
import { clearBoard, drawObject, generateRandomPosition, IObjectBody } from "../utilities/utils";

export interface ICanvasBoard {
  height: number;
  width: number;
}

const CanvasBoard = ({ height, width }: ICanvasBoard) => {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const snake1 = useSelector((state: IGlobalState) => state.snake); //use the useSelector hook of react-redux to get the required state from the store. The following will give us the snake's global state:
  const disallowedDirection = useSelector(
    (state: IGlobalState) => state.disallowedDirection
  );
  const [pos, setPos] = useState<IObjectBody>(
    generateRandomPosition(width - 20, height - 20)
  );

  const moveSnake = useCallback( //function that dispatches an action passed to the makeMove action creator.
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

  const handleKeyEvents = useCallback( //useCallback hook memoize version of this function which is called on every state change (that is, on the change of disallowedDirection and moveSnake).  This function is called on every key pressed on the keyboard.
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
        }
      } else { //If the disallowedDirection is empty then we make sure that the game will start only when the user presses the d key
        if (
          disallowedDirection !== "LEFT" &&
          disallowedDirection !== "UP" &&
          disallowedDirection !== "DOWN" &&
          event.key === "d"
        )
          moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
      }
    },
    [disallowedDirection, moveSnake]
  );

  useEffect(() => {
    //Draw on canvas each time
    setContext(canvasRef.current && canvasRef.current.getContext("2d")); //store in state variable
    drawObject(context, snake1, "#91C483"); //Draws snake at the required position
    drawObject(context, [pos], "#676FA3"); //Draws fruit randomly
    console.log(pos);
    console.log([pos]);
  }, [context]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyEvents);

    return () => {
      window.removeEventListener("keypress", handleKeyEvents);
    };
  }, [disallowedDirection, handleKeyEvents]); 

  return <canvas ref={canvasRef} height={height} width={width} />;
};
export default CanvasBoard;
