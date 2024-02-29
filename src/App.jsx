import React, { useState, useEffect } from "react";
import "./assets/sass/app.scss";
import LoadingScreen from "./partials/moduls/loading-screen";
import { menuItems } from "./partials/template/programs-items";
import Footer from "./partials/template/footer";
import Desktop from "./partials/moduls/desktop";
import WindowsUpdate from "./partials/moduls/windows-update";
import InternetExplorer from "./partials/moduls/internet-explorer";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Documents from "./partials/moduls/documents";
import SurchinSv from "./partials/moduls/surchinSv";
import Pass from "./partials/moduls/pass";
import Minesweeper from "./partials/moduls/minesweeper/minesweeper";
import Snake from "./partials/moduls/snake/snake";
import Breakout from "./partials/moduls/breakout/breakout";
import Login from "./partials/moduls/login";
import Help from "./partials/moduls/help";
import Weather from "./partials/moduls/weather/weather";
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
gsap.registerPlugin(Draggable);
// register Swiper custom elements
register();

function Memphis() {
  const [items, setItems] = useState(menuItems);
  const [shutdown, setShutdown] = useState(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );
  const [isLogIn, setIsLogIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    window
      .matchMedia("(max-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  let isCookieConsent = true;

  const setActiveProgram = (event) => {
    event.stopPropagation();
    //if clicked tab item toggle minimized state and toggle active state
    if (event.currentTarget.classList.contains("tab")) {
      const programList = items[1].programList.map((item) =>
        item.id === parseInt(event.currentTarget.id)
          ? {
              ...item,
              active: item.active === "active" ? "" : "active",
              minimized:
                item.minimized === "" && item.active === "active"
                  ? "minimized"
                  : "",
            }
          : { ...item, active: "" }
      );
      const trasformmenuItems = items.map((item) =>
        item.id === 2
          ? { ...item, programList: programList }
          : item.id === parseInt(event.currentTarget.id)
          ? {
              ...item,
              active: item.active === "active" ? "" : "active",
              minimized:
                item.minimized === "" && item.active === "active"
                  ? "minimized"
                  : "",
            }
          : { ...item, active: "" }
      );
      setItems(trasformmenuItems);
    }
    // if clicked on window set active state
    else {
      const programList = items[1].programList.map((item) =>
        item.id === parseInt(event.currentTarget.id)
          ? { ...item, active: "active", minimized: "" }
          : { ...item, active: "" }
      );
      const trasformmenuItems = items.map((item) =>
        item.id === 2
          ? { ...item, programList: programList }
          : item.id === parseInt(event.currentTarget.id)
          ? { ...item, active: "active", minimized: "" }
          : { ...item, active: "" }
      );

      setItems(trasformmenuItems);
    }

    // console.log("setActiveProgram ");
    // console.log(event.currentTarget);
  };
  const setMinimizeWindow = (event) => {
    event.stopPropagation();
    const programList = items[1].programList.map((item) =>
      "min-" + item.id === event.currentTarget.id
        ? { ...item, minimized: "minimized", active: "" }
        : item
    );
    const trasformmenuItems = items.map((item) =>
      item.id === 2
        ? { ...item, programList: programList }
        : "min-" + item.id === event.currentTarget.id
        ? { ...item, minimized: "minimized", active: "" }
        : item
    );

    setItems(trasformmenuItems);
    // console.log("setMinimizeWindow ");
    // console.log(event.currentTarget);
  };
  const setRunningProgram = (event) => {
    // console.log(event.currentTarget.id);
    event.stopPropagation();
    const programList = items[1].programList.map((item) =>
      item.id === parseInt(event.currentTarget.id)
        ? {
            ...item,
            running: "running",
            active: "active",
            minimized: "",
            focused: "focused",
          }
        : { ...item, active: "" }
    );

    const trasformmenuItems = items.map((item) =>
      item.id === 2
        ? { ...item, programList }
        : item.id === parseInt(event.currentTarget.id)
        ? {
            ...item,
            running: "running",
            active: "active",
            minimized: "",
            focused: "focused",
          }
        : { ...item, active: "" }
    );

    setItems(trasformmenuItems);

    if (trasformmenuItems[5].running === "running") {
      setShutdown(true);
      closeAllProgram();
    }
    // console.log("setRunningProgram");
    // console.log(event.currentTarget);
  };
  const setCloseProgram = (event) => {
    event.stopPropagation();
    const programList = items[1].programList.map((item) =>
      "close-" + item.id === event.currentTarget.id
        ? { ...item, running: "", active: "" }
        : item
    );
    const trasformmenuItems = items.map((item) =>
      item.id === 2
        ? { ...item, programList: programList }
        : "close-" + item.id === event.currentTarget.id
        ? { ...item, running: "", active: "" }
        : item
    );

    setItems(trasformmenuItems);

    // console.log("setCloseProgram");
    // console.log(event.currentTarget);
  };

  const closeAllProgram = () => {
    // console.log("close all");
    const programList = items[1].programList.map((item) => {
      return { ...item, running: "", active: "" };
    });
    const trasformmenuItems = items.map((item) =>
      item.id === 2
        ? { ...item, programList: programList }
        : {
            ...item,
            running: "",
            active: "",
          }
    );

    setItems(trasformmenuItems);

    // console.log("setCloseProgram");
    // console.log(event.currentTarget);
  };

  const handleShortcutClickInside = (event) => {
    event.stopPropagation();
    switch (event.detail) {
      case 1:
        const programList = items[1].programList.map((item) =>
          item.id === parseInt(event.currentTarget.id)
            ? { ...item, focused: "focused" }
            : { ...item, focused: "" }
        );
        const trasformmenuItems = items.map((item) =>
          item.id === 2
            ? { ...item, programList }
            : item.id === parseInt(event.currentTarget.id)
            ? { ...item, focused: "focused" }
            : { ...item, focused: "" }
        );
        setItems(trasformmenuItems);
        break;
      case 2:
        setRunningProgram(event);
        break;
      default:
        break;
    }
  };
  const handleShortcutClickOutside = (event) => {
    // console.log(event.currentTarget);
    const programList = items[1].programList.map((item) =>
      item.id === parseInt(event.currentTarget.id)
        ? { ...item, focused: "" }
        : { ...item, focused: "" }
    );
    const trasformmenuItems = items.map((item) =>
      item.id === 2
        ? { ...item, programList }
        : item.id === parseInt(event.currentTarget.id)
        ? { ...item, focused: "" }
        : { ...item, focused: "" }
    );

    setItems(trasformmenuItems);
  };
  const handleSubDesktopClick = (event) => {
    event.stopPropagation();
    const programList = items[1].programList.map((item) =>
      item.running === "running"
        ? { ...item, minimized: "minimized", active: "" }
        : item
    );
    const trasformmenuItems = items.map((item) =>
      item.id === 2
        ? { ...item, programList }
        : item.running === "running"
        ? { ...item, minimized: "minimized", active: "" }
        : item
    );

    setItems(trasformmenuItems);
  };

  const isRunning = (items, id, program) => {
    if (program) {
      if (items[1].programList[id].running === "running") {
        return true;
      }
    } else if (items[id].running === "running") {
      return true;
    } else return false;
  };

  return (
    <React.Fragment>
      {matches && (
        <div className="no-mobile">
          <h1>This application is not optimized for small displays.</h1>
          <p>Sorry for inconvenience &#x1F610;</p>
        </div>
      )}
      {!matches && (
        <div className="memphis">
          <LoadingScreen isShutdown={shutdown} />
          {isCookieConsent ? (
            <React.Fragment>
              <div className="draggable-container">
                <Desktop
                  items={items}
                  setItems={setItems}
                  setRunningProgram={setRunningProgram}
                  handleShortcutClickInside={handleShortcutClickInside}
                  handleShortcutClickOutside={handleShortcutClickOutside}
                  isShutdown={shutdown}
                />
                {isRunning(items, 0, false) ? (
                  <WindowsUpdate
                    items={items}
                    setActiveProgram={setActiveProgram}
                    setMinimizeWindow={setMinimizeWindow}
                    setCloseProgram={setCloseProgram}
                  />
                ) : (
                  ""
                )}
                {isRunning(items, 0, true) ? (
                  <InternetExplorer
                    items={items}
                    setActiveProgram={setActiveProgram}
                    setMinimizeWindow={setMinimizeWindow}
                    setCloseProgram={setCloseProgram}
                  />
                ) : (
                  ""
                )}
                {isRunning(items, 1, true) ? (
                  <Minesweeper
                    items={items}
                    setActiveProgram={setActiveProgram}
                    setMinimizeWindow={setMinimizeWindow}
                    setCloseProgram={setCloseProgram}
                  />
                ) : (
                  ""
                )}
                {isRunning(items, 2, true) ? (
                  <Snake
                    items={items}
                    setActiveProgram={setActiveProgram}
                    setMinimizeWindow={setMinimizeWindow}
                    setCloseProgram={setCloseProgram}
                  />
                ) : (
                  ""
                )}
                {isRunning(items, 3, true) ? (
                  <Breakout
                    items={items}
                    setActiveProgram={setActiveProgram}
                    setMinimizeWindow={setMinimizeWindow}
                    setCloseProgram={setCloseProgram}
                  />
                ) : (
                  ""
                )}
                {isRunning(items, 4, true) ? (
                  <Weather
                    items={items}
                    setActiveProgram={setActiveProgram}
                    setMinimizeWindow={setMinimizeWindow}
                    setCloseProgram={setCloseProgram}
                  />
                ) : (
                  ""
                )}
                {isRunning(items, 2, false) ? (
                  <Documents
                    items={items}
                    setActiveProgram={setActiveProgram}
                    setMinimizeWindow={setMinimizeWindow}
                    setCloseProgram={setCloseProgram}
                    handleShortcutClickInside={handleShortcutClickInside}
                  />
                ) : (
                  ""
                )}
                {isRunning(items, 3, false) ? (
                  <Help
                    items={items}
                    setActiveProgram={setActiveProgram}
                    setMinimizeWindow={setMinimizeWindow}
                    setCloseProgram={setCloseProgram}
                  />
                ) : (
                  ""
                )}
                {isRunning(items, 4, false) ? (
                  <Login
                    items={items}
                    setActiveProgram={setActiveProgram}
                    setMinimizeWindow={setMinimizeWindow}
                    setCloseProgram={setCloseProgram}
                    isLogIn={isLogIn}
                    setIsLogIn={setIsLogIn}
                    userName={userName}
                    setUserName={setUserName}
                  />
                ) : (
                  ""
                )}
                {isRunning(items, 6, false) ? (
                  <SurchinSv
                    items={items}
                    setActiveProgram={setActiveProgram}
                    setMinimizeWindow={setMinimizeWindow}
                    setCloseProgram={setCloseProgram}
                  />
                ) : (
                  ""
                )}
                {isRunning(items, 7, false) ? (
                  <Pass
                    items={items}
                    setActiveProgram={setActiveProgram}
                    setMinimizeWindow={setMinimizeWindow}
                    setCloseProgram={setCloseProgram}
                  />
                ) : (
                  ""
                )}
              </div>
              <Footer
                items={items}
                setRunningProgram={setRunningProgram}
                setActiveProgram={setActiveProgram}
                handleShortcutClickOutside={handleShortcutClickOutside}
                handleSubDesktopClick={handleSubDesktopClick}
                isShutdown={shutdown}
                isLogIn={isLogIn}
                userName={userName}
                setIsLogIn={setIsLogIn}
              />
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default Memphis;
