import React, { useEffect, useState } from "react";

function GSAPComponent({ dragWindow }) {
  return (
    <>
      <h1 className="gsap-header" ref={dragWindow}>
        Hello GSAP!!!
      </h1>
    </>
  );
}

export default GSAPComponent;
