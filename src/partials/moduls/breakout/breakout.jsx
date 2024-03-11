import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { getCookie, deleteCookie } from "../../utilities/cookies";
import { resetGame, ball, paddle } from "./utilities/utilities";
import Game from "./components/game";
gsap.registerPlugin(Draggable);

export default function Breakout({
  items,
  setCloseProgram,
  setMinimizeWindow,
  setActiveProgram,
}) {
  const dragInstance = useRef();
  const dragWindow = useRef();
  const menuItem = useRef();
  const timeline = useRef(gsap.timeline());
  const [show, setShow] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [isFullScr, setIsFullScr] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false);
  const [gameState, setGameState] = useState(0);
  const gameWidth = isFullScr ? document.documentElement.clientWidth :  890,
        gameHeight = isFullScr ? document.documentElement.clientHeight :  400;
  const width = gameWidth;
  const height = gameHeight;
  const [gameLevel, setGameLevel] = useState(1);

  const handleMenuItemClick = () => {
    setShow((myRef) => !myRef);
  };

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // const resetBestScore = () => {
  //   setBestScore(0);
  //   deleteCookie("");
  // }

  const handleFullScrClick = () => {
    setIsFullScr((myRef) => !myRef);
  }

  useEffect(() => {
    resetGame(ball, paddle, width, height);
  }, [isFullScr]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dragInstance.current = Draggable.create(dragWindow.current, {
      bounds: ".draggable-container",
      trigger: ".drag-target-breakout",
      edgeResistance: 1,
      type: "x,y",
      inertia: false,
      autoScroll: true,
      cursor: "auto",
    });
    
  }, []);

  return (
    <div
      id="24"
      className={
        "window breakout windows-box-shadow " +
        items[1].programList[3].active +
        " " +
        items[1].programList[3].minimized + " " +
        (isFullScr ? "full-screen" : "")
      }
      onClick={setActiveProgram}
      ref={dragWindow}
    >
      <div className="header drag-target-breakout">
        <div>Breakout</div>
        <div className="header-buttons">
          <div
            id="min-24"
            className="minimize windows-box-shadow"
            onClick={setMinimizeWindow}
          ></div>
          <div
            className={"exit-fs windows-box-shadow" + 
            (!isFullScr ? " d-none" : "") + 
            (isGameOn ? " disabled" : "")} 
            onClick={() => {
              setIsFullScr(false)
            }}
          >Exit Full Screen</div>
          <div className="maximize windows-box-shadow disabled"></div>
          <div
            id="close-24"
            className="close windows-box-shadow"
            onClick={setCloseProgram}
          >
            X
          </div>
        </div>
      </div>

      <div className="options">
        <div
          className={show ? "show item active" : "item active"}
          onClick={handleMenuItemClick}
          ref={menuItem}
        >
          Game
          <div className="subitems">
            <div className="subitem line" onClick={handleFullScrClick}>Full Screen</div>
            <div className="subitem line">Reset Best Score</div>
            <div id="close-24" className="subitem" onClick={setCloseProgram}>
              Exit
            </div>
          </div>
        </div>
        <div className="item" ref={menuItem}>
          Help
        </div>
      </div>
      <div className="content-header">
        <p>{isGameOn ? "Game On" : "Game OFF"}</p>
        <p>{gameState==1 ? "Game Lost" : gameState==2 ? "Game Won" : "Game"}</p>
        <p>{"Game Level " + gameLevel }</p>
        <p>{"Score " + score }</p>
      </div>
      <div className="content">
      {!isGameOn ? 
        <div className="content-rules">
              {gameState==1 ? <h3>You've lost</h3> : gameState==2 ? <p>Game Won</p> : ""}
              <p>Press spacebar to start a new game.</p>
        </div> 
      : ""}
       <Game 
        isFullScr={isFullScr}
        isGameOn={isGameOn}
        setIsGameOn={setIsGameOn}
        gameState={gameState}
        setGameState={setGameState}
        width={width}
        height={height}
        gameLevel={gameLevel}
        setGameLevel={setGameLevel}
        setScore={setScore}
       />
      </div>
    </div>
  );
}