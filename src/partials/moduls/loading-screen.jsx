import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function LoadigScreen(isCookieConsent) {
  const screen = useRef();

  useEffect(() => {
    gsap.to(screen.current, {
      opacity: 0,
      duration: 0.5,
      delay: 3,
      display: "none",
    });
  }, []);

  return <div className="loading-screen" ref={screen}></div>;
}
