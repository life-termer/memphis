import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export default function Desctop({
  items,
  setItems,
  handleShortcutClickInside,
  handleShortcutClickOutside,
  isShutdown,
}) {
  const shortcut = useRef();
  const blackScreen = useRef();
  const loadingScreen = useRef();
  const timeline = useRef(gsap.timeline());
  const dragInstance = useRef();
  const dragWindow = useRef();

  let tl = timeline.current;
  var gridWidth = 150;
  var gridHeight = 150;
  
  if (isShutdown) {
    tl.reverse().delay(-0.5);
  }
  useEffect(() => {
    let ctx = gsap.context(() => {
      tl.to(".black-screen", {
        backgroundColor: "unset",
        delay: 1.5,
      });
    });
  }, []);
  useEffect(() => {
    document.querySelectorAll(".desctop-item").forEach(element => {
      dragInstance.current = Draggable.create(element, {
        bounds: ".desctop",
        trigger: element,
        edgeResistance: 1,
        type: "x,y",
        inertia: true,
        autoScroll: true,
        cursor: "auto",
        liveSnap: {
          x: function (endValue) {
            console.log(endValue + " " + Math.round(endValue / gridWidth) * gridWidth);
            return Math.round(endValue / gridWidth) * gridWidth;
          },
          y: function (endValue) {
            return Math.round(endValue / gridHeight) * gridHeight;
          },
        },
      });
    }, []);
  
    });
    
  // const handleClickOutside = (event) => {
  //   if (!shortcut.current.contains(event.target)) {
  //     const programList = items[1].programList.map((item) =>
  //       item.id === parseInt(event.currentTarget.id)
  //         ? { ...item, focused: "" }
  //         : { ...item, focused: "" }
  //     );
  //     const trasformmenuItems = items.map((item) =>
  //       item.id === 2
  //         ? { ...item, programList }
  //         : item.id === parseInt(event.currentTarget.id)
  //         ? { ...item, focused: "" }
  //         : { ...item, focused: "" }
  //     );

  //     setItems(trasformmenuItems);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleShortcutClickOutside);
  //   return () => document.removeEventListener("mousedown", handleShortcutClickOutside);
  // });

  return (
    <div className="desctop" onClick={handleShortcutClickOutside}>
      {items.map((item) => {
        return (
          <React.Fragment key={"items" + item.id}>
            {item.id === 2 ? (
              item.programList.map((item2) => {
                if (item2.desktopShortcut === true) {
                  return (
                    <div
                      id={item2.id}
                      key={item2.id}
                      ref={shortcut}
                      className={
                        "desctop-item " + item2.running + " " + item2.focused
                      }
                      onClick={handleShortcutClickInside}
                      // onClick={setActiveShortcut}
                    >
                      <div className="image-wrapper">
                        <img src={item2.image} alt={item2.imageAlt} />
                      </div>
                      <div className="text">{item2.fullName}</div>
                    </div>
                  );
                } else return "";
              })
            ) : item.desktopShortcut === true ? (
              <div
                id={item.id}
                key={item.id}
                className={
                  item.classes +
                  " desctop-item " +
                  item.running +
                  " " +
                  item.focused
                }
                onClick={handleShortcutClickInside}
                //   onClick={setActiveShortcut}
              >
                <div className="image-wrapper">
                  <img src={item.image} alt={item.imageAlt} />
                </div>
                <div className="text">{item.fullName}</div>
              </div>
            ) : (
              ""
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
