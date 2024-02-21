import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { getCookie, deleteCookie } from "../../utilities/cookies";
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

  const handleMenuItemClick = () => {
    setShow((myRef) => !myRef);
  };

  const [bestScore, setBestScore] = useState(0);

  const resetBestScore = () => {
    setBestScore(0);
    deleteCookie("");
  }

  const handleRulesClick = () => {
    setShowRules((myRef) => !myRef);
  }

  useEffect(() => {
    if (getCookie("")) {
      var bs = Number(getCookie(""));
      setBestScore(bs);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        items[1].programList[3].minimized
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
            <div className="subitem line" onClick={handleRulesClick}>Rules</div>
            <div className="subitem line" onClick={resetBestScore}>Reset Best Score</div>
            <div id="close-24" className="subitem" onClick={setCloseProgram}>
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
        </div>
      </div>
    </div>
  );
}