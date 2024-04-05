import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Game from "./game";
gsap.registerPlugin(Draggable);

export default function BouncingBall({
  items,
  setCloseProgram,
  setMinimizeWindow,
  setActiveProgram,
}) {
  const [maximized, setMaximized] = useState(false);
  const dragInstance = useRef();
  const dragWindow = useRef();

  useEffect(() => {
    dragInstance.current = Draggable.create(dragWindow.current, {
      bounds: ".draggable-container",
      trigger: ".drag-target-bouncing-ball",
      edgeResistance: 1,
      type: "x,y",
      inertia: false,
      autoScroll: true,
      cursor: "auto",
    });
  }, []);

  const setMaximizeWindow = () => {
    setMaximized((ref) => !ref);
  };
  const toggleMaximizeWindow = (event) => {
    switch (event.detail) {
      case 2:
        setMaximized((ref) => !ref);
        break;
    }
  };
  var classMax = maximized ? " maximized " : "";
  
  {
    return (
      <div
        id="26"
        className={
          "window bouncing-ball windows-box-shadow " +
          items[1].programList[6].active +
          " " +
          items[1].programList[6].minimized +
          classMax
        }
        onClick={setActiveProgram}
        ref={dragWindow}
      >
        <div className="header drag-target-bouncing-ball" onClick={toggleMaximizeWindow}>
          <div>Bouncing Ball</div>
          <div className="header-buttons">
            <div
              id="min-27"
              className="minimize windows-box-shadow"
              onClick={setMinimizeWindow}
            ></div>
            <div
              className="maximize windows-box-shadow"
              onClick={setMaximizeWindow}
            ></div>
            <div
              id="close-27"
              className="close windows-box-shadow"
              onClick={setCloseProgram}
            >
              X
            </div>
          </div>
        </div>
        <div className="content d-block">
          <Game />
        </div>
      </div>
    );
  }
}
