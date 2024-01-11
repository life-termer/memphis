import {
  CallEffect,
  delay,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  RIGHT,
  LEFT,
  UP,
  DOWN,
  setDisDirection,
  ISnakeCoord,
	STOP_GAME,
	RESET,
  INCREMENT_SCORE
} from "../actions/actions";
// import { gameDelay } from "../../snake";
var gameDelay = 200;

export function* moveSaga(params: {
  type: string;
  payload: ISnakeCoord;
}): Generator<
  | PutEffect<{ type: string; payload: ISnakeCoord }>
  | PutEffect<{ type: string; payload: string }>
  | PutEffect<{ type: number; payload: number }>
  | CallEffect<true>
> {
  if(params.type === RESET) {
    gameDelay = 200;
  }
  while (params.type !== RESET && params.type !== STOP_GAME) {
    //dispatches movement actions
    yield put({
      type: params.type.split("_")[1],
      payload: params.payload,
    });

    //Dispatches SET_DIS_DIRECTION action
    switch (params.type.split("_")[1]) {
      case RIGHT:
        yield put(setDisDirection(LEFT));
        break;

      case LEFT:
        yield put(setDisDirection(RIGHT));
        break;

      case UP:
        yield put(setDisDirection(DOWN));
        break;

      case DOWN:
        yield put(setDisDirection(UP));
        break;
      
    }
    yield delay(gameDelay);
  }
}

export function* setDelay() {
  if(gameDelay > 50) {
    yield gameDelay = gameDelay - 2;
  }
  if(gameDelay > 20 && gameDelay <= 50) {
    yield gameDelay = gameDelay - 0.5;
  }
}

//This watcher saga will watch for the actions above and execute the moveSaga function which is a worker saga.
function* watcherSagas() {
  yield takeLatest([MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN, RESET, STOP_GAME], moveSaga);
  yield takeLatest([INCREMENT_SCORE], setDelay);
}

export default watcherSagas;
