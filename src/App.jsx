import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import "./assets/sass/app.scss";
import LoadigScreen from "./partials/moduls/loading-screen";
import { menuItems } from "./partials/template/programs-items";
import Footer from "./partials/template/footer";
import WindowsUpdate from "./partials/moduls/windows-update";
import InternetExplorer from "./partials/moduls/internet-explorer";
import Heading from "./partials/moduls/GSAPComponent";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

function Memphis() {
  const [items, setItems] = useState(menuItems);
  let isCookieConsent = true;

  const setActiveProgram = (event) => {
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
    console.log("setMinimizeWindow ");
    console.log(event.currentTarget);
  };
  const setRunningProgram = (event) => {
    const programList = items[1].programList.map((item) =>
      item.id === parseInt(event.currentTarget.id)
        ? { ...item, running: "running", active: "active" }
        : { ...item, active: "" }
    );
    const trasformmenuItems = items.map((item) =>
      item.id === 2
        ? { ...item, programList }
        : item.id === parseInt(event.currentTarget.id)
        ? { ...item, running: "running", active: "active" }
        : { ...item, active: "" }
    );

    setItems(trasformmenuItems);

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

  const isRunning = (items, id, program) => {
    if (program) {
      if (items[1].programList[id].running === "running") {
        return true;
      }
    } else if (items[id].running === "running") {
      return true;
    } else return false;
  };

  //draggable

  // const app = useRef();
  // const dragInstance = useRef();
  // const dragWindow = useRef();
  // const dragShortcut = useRef();

  // useEffect(() => {
  //   dragInstance.current = Draggable.create(dragWindow.current, {
  //     bounds: ".draggable-container",
  //     trigger: ".drag-target",
  //     edgeResistance: 1,
  //     type: "x,y",
  //     inertia: true,
  //     autoScroll: true,
  //   });
  // }, []);

  return (
    <div className="memphis">
      <LoadigScreen isCookieConsent={isCookieConsent} />
      {isCookieConsent ? (
        <>
          <div className="draggable-container">
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
          </div>
          <Footer
            items={items}
            setRunningProgram={setRunningProgram}
            setActiveProgram={setActiveProgram}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Memphis;
