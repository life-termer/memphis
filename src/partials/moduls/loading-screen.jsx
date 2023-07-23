import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function LoadigScreen({ isShutdown }) {
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
      })
        .to(loadingScreen.current, {
          display: "block",
          delay: -1,
        })
        .to(loadingScreen.current, {
          opacity: 0,
          duration: 0.5,
          delay: 1,
        })
        .to(".black-screen", {
          display: "none",
        });
    });
  }, []);

  return (
    <div className="black-screen" ref={blackScreen}>
      <div className="loading-screen" ref={loadingScreen}></div>
    </div>
  );
}
