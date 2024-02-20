import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Game from "./components/game";
import { getCookie, deleteCookie } from "../../utilities/cookies";
gsap.registerPlugin(Draggable);

export var gameDelay = 200;

export default function Snake({
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
  const serverURL = process.env.REACT_APP_SERVER_URL;

  const handleMenuItemClick = () => {
    setShow((myRef) => !myRef);
  };

  const handleRulesClick = () => {
    setShowRules((myRef) => !myRef);
  }

  const [bestScore, setBestScore] = useState(0);

  // Fetch best score on initial render
  useEffect(() => {
    if(serverURL) {
      fetchScore()
    } else {
      if (getCookie("bestScoreSnake")) {
        var bs = Number(getCookie("bestScoreSnake"));
        setBestScore(bs);
      }
    }
  }, [])

  //Fetch score
  const fetchScore = async () => {
    //Send GET request to 'snake/all' endpoint
    axios
      .get(process.env.REACT_APP_SERVER_URL + '/snake/all') //console.log(process.env.REACT_APP_SERVER_URL);
      .then(response => {
        //Update the state
        if(response.data[0]) {
          setBestScore(response.data[0].bscore);
        }
        else {
          setBestScore(0);
        }
      })
      .catch(err => console.log(`There was an error retrieving the data ${err}`));
  }

  const resetBestScore = () => {
    if(serverURL) {
      //Send PUT request to 'books/reset' endpoint
      axios
      .put(process.env.REACT_APP_SERVER_URL + '/snake/reset')
      .then(() => {
        //Fetch score to refresh
        fetchScore();
      })
      .catch(error => console.error(`There was an error resetting the best score: ${error}`))
    } else {
      setBestScore(0);
      deleteCookie("bestScoreSnake");
    }
  }

  useEffect(() => {
    dragInstance.current = Draggable.create(dragWindow.current, {
      bounds: ".draggable-container",
      trigger: ".drag-target-snake",
      edgeResistance: 1,
      type: "x,y",
      inertia: false,
      autoScroll: true,
      cursor: "auto",
    });
    console.log(serverURL);
  }, []);

  return (
    <div
      id="23"
      className={
        "window snake windows-box-shadow " +
        items[1].programList[2].active +
        " " +
        items[1].programList[2].minimized
      }
      onClick={setActiveProgram}
      ref={dragWindow}
    >
      <div className="header drag-target-snake">
        <div>Snake</div>
        <div className="header-buttons">
          <div
            id="min-23"
            className="minimize windows-box-shadow"
            onClick={setMinimizeWindow}
          ></div>
          <div className="maximize windows-box-shadow disabled"></div>
          <div
            id="close-23"
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
            <div className="subitem line" onClick={handleRulesClick}>Rules</div>
            <div className="subitem line" onClick={resetBestScore}>Reset Best Score</div>
            <div id="close-23" className="subitem" onClick={setCloseProgram}>
              Exit
            </div>
          </div>
        </div>
        <div className="item" ref={menuItem}>
          Help
        </div>
      </div>
      <div className="content">
        <div className="inner-content">
          <Game 
            bestScore={bestScore}
            setBestScore={setBestScore}
            showRules={showRules}
            setShowRules={setShowRules}
            fetchScore={fetchScore}
          />
        </div>
      </div>
    </div>
  );
}
//npm i --save-dev typescript @typescript-eslint/eslint-plugin@5.6.0 @typescript-eslint/parser@5.6.0 eslint@7.32.0
// "devDependencies": {
//   ...
//   "@typescript-eslint/eslint-plugin": "^5.6.0",
//   "@typescript-eslint/parser": "^5.6.0",
//   "eslint": "^7.32.0",
//   "typescript": "^4.4.3"
// }