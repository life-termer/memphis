import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Game from "./components/game";
import { getCookie, deleteCookie } from "../../utilities/cookies";
gsap.registerPlugin(Draggable);

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

  const handleMenuItemClick = () => {
    setShow((myRef) => !myRef);
  };

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
            <div className="subitem line">New</div>
            <div>Begginer</div>
            <div>Intermediate</div>
            <div>Expert</div>
            <div className="subitem line">Best Times</div>
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
        <Game />
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