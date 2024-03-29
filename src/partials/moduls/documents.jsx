import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export default function Documents({
  items,
  setCloseProgram,
  setMinimizeWindow,
  setActiveProgram,
  handleShortcutClickInside,
}) {
  const [maximized, setMaximized] = useState(false);
  const dragInstance = useRef();
  const dragWindow = useRef();

  useEffect(() => {
    dragInstance.current = Draggable.create(dragWindow.current, {
      bounds: ".draggable-container",
      trigger: ".drag-target-documents",
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

  return (
    <div
      id="3"
      className={
        "window documents windows-box-shadow " +
        items[2].active +
        " " +
        items[2].minimized +
        classMax
      }
      onClick={setActiveProgram}
      ref={dragWindow}
    >
      <div
        className="header drag-target-documents"
        onClick={toggleMaximizeWindow}
      >
        <div>My Documents</div>
        <div className="header-buttons">
          <div
            id="min-3"
            className="minimize windows-box-shadow"
            onClick={setMinimizeWindow}
          ></div>
          <div
            className="maximize windows-box-shadow"
            onClick={setMaximizeWindow}
          ></div>
          <div
            id="close-3"
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
        <div
          id="8"
          key="8"
          className={items[7].classes + " file " + items[7].focused}
          onClick={handleShortcutClickInside}
        >
          <div className="image-wrapper">
            <img src={items[7].image} alt={items[7].imageAlt} />
          </div>
          <p>passwords.txt</p>
        </div>
        <div
          id="7"
          key="7"
          className={items[6].classes + " file " + items[6].focused}
          onClick={handleShortcutClickInside}
        >
          <div className="image-wrapper">
            <img src={items[6].image} alt={items[7].imageAlt} />
          </div>
          <p>Dmitry Surchin Resume.pdf</p>
        </div>
      </div>
    </div>
  );
}
