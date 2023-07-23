import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import cvPdf from "../../assets/docs/Surchin_CV.pdf";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export default function Pass({
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
      trigger: ".drag-target-pass",
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
    //event.detail to get the current click count. It's the number of time the mouse's been clicked in the same area in a short time
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
        id="8"
        className={
          "window pass windows-box-shadow " +
          items[7].active +
          " " +
          items[7].minimized +
          classMax
        }
        onClick={setActiveProgram}
        ref={dragWindow}
      >
        <div className="header drag-target-pass" onClick={toggleMaximizeWindow}>
          <div>passwords.txt</div>
          <div className="header-buttons">
            <div
              id="min-8"
              className="minimize windows-box-shadow"
              onClick={setMinimizeWindow}
            ></div>
            <div
              className="maximize windows-box-shadow"
              onClick={setMaximizeWindow}
            ></div>
            <div
              id="close-8"
              className="close windows-box-shadow"
              onClick={setCloseProgram}
            >
              X
            </div>
          </div>
        </div>
        <div className="options line">
          <div className="item">File</div>
          <div className="item">Edit</div>
          <div className="item">View</div>
          <div className="item">Go</div>
          <div className="item">Favorites</div>
          <div className="item">Tools</div>
          <div className="item">Help</div>
        </div>
        <div className="content white">
        </div>
      </div>
    );
  }
}