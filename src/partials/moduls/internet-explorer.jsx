import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export default function InternetExplorer({
  items,
  setCloseProgram,
  setMinimizeWindow,
  setActiveProgram,
}) {
  const [maximized, setMaximized] = useState(false);
  const [input, setInput] = useState("http://dsurch.in/index.html");
  const [irameSrc, setIrameSrc] = useState("http://dsurch.in/index.html");
  const dragInstance = useRef();
  const dragWindow = useRef();

  //   useLayoutEffect(() => {
  //     // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
  //     let ctx = gsap.context(() => {
  //       dragInstance.current = Draggable.create(dragWindow.current, {
  //         // bounds: ".window-wrpapper",
  //         trigger: ".drag-target",
  //         edgeResistance: 1,
  //         type: "x,y",
  //         inertia: true,
  //         autoScroll: true,
  //       });
  //     }, root); // <- IMPORTANT! Scopes selector text

  //     return () => ctx.revert(); // cleanup
  //   }, []); // <- empty dependency Array so it doesn't re-run on every render

  useEffect(() => {
    dragInstance.current = Draggable.create(dragWindow.current, {
      bounds: ".draggable-container",
      trigger: ".drag-target-ie",
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

  const handleInputField = (event) => {
    setInput(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIrameSrc(input);
    }
  };

  {
    return (
      <div
        id="21"
        className={
          "window ie windows-box-shadow " +
          items[1].programList[0].active +
          " " +
          items[1].programList[0].minimized +
          classMax
        }
        onClick={setActiveProgram}
        ref={dragWindow}
      >
        <div className="header drag-target-ie" onClick={toggleMaximizeWindow}>
          <div>Dmitry Surchin | Web Developer</div>
          <div className="header-buttons">
            <div
              id="min-21"
              className="minimize windows-box-shadow"
              onClick={setMinimizeWindow}
            ></div>
            <div
              className="maximize windows-box-shadow"
              onClick={setMaximizeWindow}
            ></div>
            <div
              id="close-21"
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
            value={input}
            onChange={handleInputField}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="content">
          <iframe src={irameSrc}></iframe>
        </div>
      </div>
    );
  }
}

// isRunning(items, 0, true)
