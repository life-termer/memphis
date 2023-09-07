import {
  createStore,
  applyMiddleware
} from "redux";
import createSagaMiddleware from "redux-saga";
import gameReducer from "./reducers/reducers";
import { watcherSagas } from "./sagas/sagas";
const sagaMiddleware = createSagaMiddleware();

const store = createStore(gameReducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(watcherSagas);
export default store;