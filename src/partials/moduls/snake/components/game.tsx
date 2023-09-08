import React from "react";
import { Provider } from "react-redux";
import ScoreCard from "./scoreCard";
import store from "../store/store";
import CanvasBoard from "./canvasBoard";

const Game = () => {
  return (
    <Provider store={store}>
        <div className="content-header">
          <ScoreCard />
        </div>
        <CanvasBoard height={600} width={1000} />
    </Provider>
    
  );
};

export default Game;