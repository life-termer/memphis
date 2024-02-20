import React, { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import ScoreCard from "./scoreCard";
import store from "../store/store";
import CanvasBoard from "./canvasBoard";
import { IGlobalState } from "../store/reducers/reducers";
import BestScore from "./bestScore";

export interface IGame {
  bestScore: number;
  setBestScore: any;
  showRules: boolean;
  setShowRules: any;
  fetchScore: any;
}
const Game = ({bestScore, setBestScore, showRules, setShowRules, fetchScore}: IGame) => {

  return (
    <Provider store={store}>
        <div className="content-header">
          <ScoreCard />
          <BestScore
            bestScore={bestScore}
            setBestScore={setBestScore}
          />
        </div>
        <CanvasBoard 
        height={600} 
        width={1000} 
        bestScore={bestScore} 
        setBestScore={setBestScore} 
        showRules={showRules}
        setShowRules={setShowRules}
        fetchScore={fetchScore}
        />
    </Provider>
  );
};

export default Game;

