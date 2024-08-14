import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import options from "../../assets/images/icons/ic-notepad-f-gear.png";
import webHelp from "../../assets/images/icons/ic-win-help.png";
import windows from "../../assets/images/windows98.webp";
gsap.registerPlugin(Draggable);

export default function Help({
  items,
  setCloseProgram,
  setMinimizeWindow,
  setActiveProgram,
}) {
  const [maximized, setMaximized] = useState(false);
  const dragInstance = useRef();
  const dragWindow = useRef();
  const [isTwoColumns, setIsTwoColumns] = useState(true);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    dragInstance.current = Draggable.create(dragWindow.current, {
      bounds: ".draggable-container",
      trigger: ".drag-target-help",
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
        id="4"
        className={
          "window help windows-box-shadow " +
          items[3].active +
          " " +
          items[3].minimized +
          classMax
        }
        onClick={setActiveProgram}
        ref={dragWindow}
      >
        <div className="header drag-target-help" onClick={toggleMaximizeWindow}>
          <div>Windows Help</div>
          <div className="header-buttons">
            <div
              id="min-4"
              className="minimize windows-box-shadow"
              onClick={setMinimizeWindow}
            ></div>
            <div
              className="maximize windows-box-shadow"
              onClick={setMaximizeWindow}
            ></div>
            <div
              id="close-4"
              className="close windows-box-shadow"
              onClick={setCloseProgram}
            >
              X
            </div>
          </div>
        </div>
        <div className="options line d-flex">
        <div 
        className="item active d-flex flex-column justify-between-center align-items-center"
        onClick={() => setIsTwoColumns((prev) => !prev)}
        >
            <span className="mt-2">&#8688;</span>
            <p className="m-0 mt-auto text-center">{isTwoColumns ? "Hide" : "Show" }</p>
          </div>
          <div className="item d-flex flex-column justify-between-center align-items-center">
            <span className="mt-2">&#8678;</span>
            <p className="m-0 mt-auto">Back</p>
          </div>
          <div className="item d-flex flex-column justify-between-center align-items-center">
            <span className="mt-2">&#8680;</span>
            <p className="m-0 mt-auto">Forward</p>
          </div>
          <div className="item triangle d-flex flex-column justify-between-center align-items-center">
            <img src={options} alt="" />
            <p className="m-0">Options</p>
          </div>
          <div className="item d-flex flex-column justify-between-center align-items-center">
            <img src={webHelp} alt="" />
            <p className="m-0">Web Help</p>
          </div>
        </div>
        
        <div className="content">
          <div className="row w-100 g-0">
            <div className={ isTwoColumns ? "col-6 left" : "d-none" }>
              <div className="content-left">
                <div className="inner">
                  <ul>
                    <li className={index === 1 ? "question active" : "question"}
                    onClick={() => {
                      setIndex(1)
                    }}
                    >Welcome to Help</li>
                    <li className={index === 2 ? "question active" : "question"}
                    onClick={() => {
                      setIndex(2)
                    }}
                    >Done</li>
                    <li className={index === 3 ? "question active" : "question"}
                    onClick={() => {
                      setIndex(3)
                    }}
                    >To do</li>
                    <li className={index === 4 ? "question active" : "question"}
                    onClick={() => {
                      setIndex(4)
                    }}
                    >Contact</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={ isTwoColumns ? "col-6" : "col-12" }>
              <div className="content-right">
                <div className="inner">
                  <div className={index === 1 ? "response" : "d-none"}>
                    <img src={windows} alt="" />
                  </div>
                  <div className={index === 2 ? "response" : "d-none"}>
                    <ul>
                      <li>Basic functionality - start menu, clock, desktop, windows, buttons.</li>
                      <li>Several simple modules that simulate Internet Explorer, Notepad etc.</li>
                      <li>Start and shutdown animations with GSAP library.</li>
                      <li>Windows and shortcuts drag and drop with GSAP library.</li>
                      <li>Minesweeper game - 3 game types, scores are saved in user cookies.</li>
                      <li>Snake game with Redux, Redux Saga and TypeScript</li>
                      <li>Backend - Node.js and Express with a SQLite database (not deployed yet)</li>
                      <li>Weather app - Open-Meteo API and Chart.js</li>
                      <li>Breakout game - canvas.</li>
                      <li>Tetris game</li>
                      <li>Bouncing Ball game - Phaser 3</li>
                    </ul>
                  </div>
                  <div className={index === 3 ? "response" : "d-none"}>
                    <ul>
                      <li>Context menu</li>
                      <li>Some properties - background change, screen saver etc.</li>
                      <li>User authentication and authorization</li>
                      <li>User registration (maybe)</li>
                      <li>Temporary list of running programs with sorting (maybe)</li>
                      <li>Backend deploy (maybe)</li>
                    </ul>
                  </div>
                  <div className={index === 4 ? "response" : "d-none"}>
                    Email: <a href="mailto:dsurchin@gmail.com">dsurchin@gmail.com</a><br></br><br></br>
                    Repository: <a href="https://github.com/life-termer/memphis">https://github.com/life-termer/memphis</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
