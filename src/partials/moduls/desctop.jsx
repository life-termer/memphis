import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

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

  let tl = timeline.current;
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
