import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import cvPdf from "../../assets/docs/Dmitry Surchin Resume.pdf";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export default function SurchinSv({
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
      trigger: ".drag-target-cv",
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
        id="7"
        className={
          "window cv windows-box-shadow " +
          items[6].active +
          " " +
          items[6].minimized +
          classMax
        }
        onClick={setActiveProgram}
        ref={dragWindow}
      >
        <div className="header drag-target-cv" onClick={toggleMaximizeWindow}>
          <div>Dmitry Surchin Resume.pdf</div>
          <div className="header-buttons">
            <div
              id="min-7"
              className="minimize windows-box-shadow"
              onClick={setMinimizeWindow}
            ></div>
            <div
              className="maximize windows-box-shadow"
              onClick={setMaximizeWindow}
            ></div>
            <div
              id="close-7"
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
        <object data={cvPdf}
                width="100%"
                height="100%">
        </object>
        </div>
      </div>
    );
  }
}