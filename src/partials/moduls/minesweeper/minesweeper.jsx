import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export default function Minesweeper({
  items,
  setCloseProgram,
  setMinimizeWindow,
  setActiveProgram,
}) {
  const dragInstance = useRef();
  const dragWindow = useRef();
  const menuItem = useRef();

  console.log(menuItem);
  const [show, setShow] = useState(false);

  const handleMenuItemClick = (event) => {
    setShow((myRef) => !myRef);
  };

  useEffect(() => {
    dragInstance.current = Draggable.create(dragWindow.current, {
      bounds: ".draggable-container",
      trigger: ".drag-target-minesweeper",
      edgeResistance: 1,
      type: "x,y",
      inertia: false,
      autoScroll: true,
      cursor: "auto",
    });
  }, []);
  {
    return (
      <div
        id="22"
        className={
          "window minesweeper windows-box-shadow " +
          items[1].programList[1].active +
          " " +
          items[1].programList[1].minimized
        }
        onClick={setActiveProgram}
        ref={dragWindow}
      >
        <div className="header drag-target-minesweeper">
          <div>Minesweeper</div>
          <div className="header-buttons">
            <div
              id="min-22"
              className="minimize windows-box-shadow"
              onClick={setMinimizeWindow}
            ></div>
            <div
              id="close-22"
              className="close windows-box-shadow"
              onClick={setCloseProgram}
            >
              X
            </div>
          </div>
        </div>
        <div className="options line">
          <div className={
            show ? "show item active" : "item active"
          }
          onClick={handleMenuItemClick} ref={menuItem}>
            Game
            <div className="subitems line"></div>
          </div>
          <div className="item" ref={menuItem}>Help</div>
        </div>
        <div className="content white"></div>
      </div>
    );
  }
}
