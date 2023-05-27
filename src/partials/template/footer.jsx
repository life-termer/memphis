import React, { useState, useEffect, useRef } from "react";
import Clock from "../moduls/clock";

export default function Footer({ items, setRunningProgram, setActiveProgram }) {
  const [active, setActive] = useState(false);
  const startMenu = useRef();
  const startButton = useRef();

  const handleStartClickInside = (event) => {
    setActive((myRef) => !myRef);
  };
  const handleClickOutside = (event) => {
    if (
      !startMenu.current.contains(event.target) &&
      !startButton.current.contains(event.target)
    ) {
      setActive(false);
    }
  };
  const handleStartProgramClick = (event) => {
    setActive(false);
    setRunningProgram(event);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <footer>
      <div id="start-bar">
        <div id="start-button-items">
          <span
            id="start-button"
            ref={startButton}
            onClick={handleStartClickInside}
            className="windows-box-shadow"
          ></span>
          <div
            id="start-menu"
            ref={startMenu}
            className={
              active ? "active windows-box-shadow" : "windows-box-shadow"
            }
          >
            <div id="windows-start-menu-blue">
              Windows<span>98</span>
            </div>
            <ul>
              {items.map((item, index) => {
                return (
                  <React.Fragment key={"startItems" + item.id}>
                    {item.id === 2 ? (
                      <li id={item.id} key={item.id} className={item.classes}>
                        <img src={item.image} alt={item.imageAlt} />
                        {item.fullName}
                        <ul id="20" key="20" className="windows-box-shadow">
                          {item.programList.map((item2) => {
                            return (
                              <li
                                id={item2.id}
                                key={item2.id}
                                className={item2.classes}
                                onClick={handleStartProgramClick}
                              >
                                <img src={item2.image} alt={item.imageAlt} />
                                {item2.fullName}
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    ) : (
                      <li
                        id={item.id}
                        key={item.id}
                        className={
                          index === 0 || index === 4 || index === 5
                            ? "disabled " + item.classes
                            : item.classes
                        }
                        onClick={handleStartProgramClick}
                      >
                        <img src={item.image} alt={item.imageAlt} />
                        {item.fullName}
                      </li>
                    )}
                  </React.Fragment>
                );
              })}
            </ul>
          </div>

          <div id="items">
            {items.map((item) => {
              return (
                <React.Fragment key={"items" + item.id}>
                  {item.id === 2 ? (
                    item.programList.map((item2) => {
                      if (item2.running === "running") {
                        return (
                          <div
                            id={item2.id}
                            key={item2.id}
                            className={
                              "tab windows-box-shadow " +
                              item2.running +
                              " " +
                              item2.active
                            }
                            onClick={setActiveProgram}
                          >
                            <span>
                              <img src={item2.image} alt={item2.imageAlt} />
                              {item2.fullName}
                            </span>
                          </div>
                        );
                      } else return "";
                    })
                  ) : item.running === "running" ? (
                    <div
                      id={item.id}
                      key={item.id}
                      className={
                        "tab windows-box-shadow " +
                        item.running +
                        " " +
                        item.active
                      }
                      onClick={setActiveProgram}
                    >
                      <span>
                        <img src={item.image} alt={item.imageAlt} />
                        {item.fullName}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <Clock />
      </div>
    </footer>
  );
}

// return (
//   <div>
//     {(() => {
//       if (false) {
//         return (
//           <div>someCase</div>
//         )
//       } else if (false) {
//         return (
//           <div>otherCase</div>
//         )
//       } else {
//         return (
//           <div>catch all</div>
//         )
//       }
//     })()}
//   </div>
// )
