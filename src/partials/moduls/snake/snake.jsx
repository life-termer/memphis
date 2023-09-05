import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import Draw from "./utils/draw";
import BindEvents from "./utils/bindEvents";
import { getCookie, deleteCookie } from "../../utilities/cookies";
gsap.registerPlugin(Draggable);

export default function Snake({
  items,
  setCloseProgram,
  setMinimizeWindow,
  setActiveProgram,
}) {
  const dragInstance = useRef();
  const dragWindow = useRef();
  const menuItem = useRef();
  const timeline = useRef(gsap.timeline());
  const [show, setShow] = useState(false);
  const snakeGameRef = useRef(null);
  const [snakeDirection, setSnakeDirection] = useState('right');
  const [gameSpeed, setGameSpeed] = useState(3);
  const xPosition = Math.floor(Math.random() * 20) + 3;
  const yPosition = Math.floor(Math.random() * 22);
  let blockSize = 20;
  let posArray = [];
  // posArray.push([xPosition, yPosition]);
  // posArray.push([xPosition - 1, yPosition]);
  // posArray.push([xPosition - 2, yPosition]);
  posArray.push([5, 4]);
  posArray.push([4, 4]);
  posArray.push([3, 4]);

  const handleMenuItemClick = () => {
    setShow((myRef) => !myRef);
  };
  BindEvents(setSnakeDirection);
  useEffect(() => {
    snakeGameRef.current.setAttribute("width", 500);
    snakeGameRef.current.setAttribute("height", 500);
    const snakeGame = snakeGameRef.current;
    const snakeGameCtx = snakeGame.getContext("2d");

    // let xPosition = 0;
    // let yPosition = 0;
    let frameCount = 0; //This is a control variable that counts frames. If you prefer, you can use a counter for time instead. The goal of this variable is provide a clock to our draw function since the animation is time dependent.
    let animationFrameId;
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame All the steps that will be repeated in the animation were wrapped in a function called render which will be called recursively by the requestAnimationFrame method.
    const render = () => {
      frameCount++;
      Draw(snakeGameCtx, xPosition, yPosition, blockSize, posArray, frameCount, gameSpeed, snakeDirection)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    dragInstance.current = Draggable.create(dragWindow.current, {
      bounds: ".draggable-container",
      trigger: ".drag-target-snake",
      edgeResistance: 1,
      type: "x,y",
      inertia: false,
      autoScroll: true,
      cursor: "auto",
    });
    return () => { //The function returned in the useEffect callback (aka clean up function) is called right before the component unmount. That way we can ensure that our animation frame is cancelled after our canvas component unmount.
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [snakeDirection]);

  // The useEffect hook allow us to perform side effects in function components. It means that we can call functions right after the component
  // did mount, component update or change of some variable, and some other stuff.
  // We are interested in the first case right now: the component did mount. Right after the canvas element is available in the dom for us, we
  // want to get it on javascript to take its context and make some draw. To do that, we pass a function to be executed as the first argument of
  // the useEffect, and an empty array as the second. The empty array says to useEffect that we want execute that function only once, after the
  // component did mount (we will discuss more about this array later). If we pass only the first argument (the function), useEffect will call
  // the function after every single update of the component.

  // You may notice that now we have changed the array as the second argument of the useEffect, right? Now it is no longer empty. We have put
  // the draw function inside it. Do you remember that I said that useEffect could call functions after a change of some variable? This is the
  // case. That array is known as the dependencies array, and everything we put in it, is watched by the useEffect. When anything that is inside
  // of the dependencies array changes, the function will be called again with its updated values. Thus, every time we change the draw, the
  // function of the useEffect will be called again for the new draw.

  return (
    <div
      id="23"
      className={
        "window snake windows-box-shadow " +
        items[1].programList[2].active +
        " " +
        items[1].programList[2].minimized
      }
      onClick={setActiveProgram}
      ref={dragWindow}
    >
      <div className="header drag-target-snake">
        <div>Snake</div>
        <div className="header-buttons">
          <div
            id="min-23"
            className="minimize windows-box-shadow"
            onClick={setMinimizeWindow}
          ></div>
          <div className="maximize windows-box-shadow disabled"></div>
          <div
            id="close-23"
            className="close windows-box-shadow"
            onClick={setCloseProgram}
          >
            X
          </div>
        </div>
      </div>

      <div className="options">
        <div
          className={show ? "show item active" : "item active"}
          onClick={handleMenuItemClick}
          ref={menuItem}
        >
          Game
          <div className="subitems">
            <div className="subitem line">New</div>
            <div>Begginer</div>
            <div>Intermediate</div>
            <div>Expert</div>
            <div className="subitem line">Best Times</div>
            <div id="close-23" className="subitem" onClick={setCloseProgram}>
              Exit
            </div>
          </div>
        </div>
        <div className="item" ref={menuItem}>
          Help
        </div>
      </div>
      <div className="content">
        <canvas ref={snakeGameRef}></canvas>
      </div>
    </div>
  );
}
