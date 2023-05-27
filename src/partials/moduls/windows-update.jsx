import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export default function WindowsUpdate({
  items,
  setCloseProgram,
  setMinimizeWindow,
  setActiveProgram,
}) {
  const dragInstance = useRef();
  const dragWindow = useRef();

  useEffect(() => {
    dragInstance.current = Draggable.create(dragWindow.current, {
      bounds: ".draggable-container",
      trigger: ".drag-target-update",
      edgeResistance: 1,
      type: "x,y",
      inertia: false,
      autoScroll: true,
      cursor: "auto",
    });
  }, []);

  const [maximized, setMaximized] = useState(false);

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
        id="1"
        className={
          "window ie windows-box-shadow " +
          items[0].active +
          " " +
          items[0].minimized +
          classMax
        }
        onClick={setActiveProgram}
        ref={dragWindow}
      >
        <div
          className="header drag-target-update"
          onClick={toggleMaximizeWindow}
        >
          <div>Window Update</div>
          <div className="header-buttons">
            <div
              id="min-1"
              className="minimize windows-box-shadow"
              onClick={setMinimizeWindow}
            ></div>
            <div
              className="maximize windows-box-shadow"
              onClick={setMaximizeWindow}
            ></div>
            <div
              id="close-1"
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
          <div className="item">Views</div>
          <div className="item">Favorites</div>
          <div className="item">Tools</div>
          <div className="item">Help</div>
        </div>
        <div className="options padding">
          <div className="item">Address</div>
          <input
            type="text"
            className="inverse-windows-box-shadow"
            value="http://dsurch.in/"
          />
        </div>
        <div className="content">
          <iframe src="http://dsurch.in/"></iframe>
        </div>
      </div>
    );
  }
}
