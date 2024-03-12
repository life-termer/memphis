import React, { useRef, useState, useEffect } from "react";
import { draw, move, keys } from "../utilities/utilities";

export default function Game(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

    const render = () => {
      draw(context, props);
      move(keys, props);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [draw, props.isGameOn, props.isFullScr]);

  return (
    <canvas
      ref={canvasRef}
      width={props.width}
      height={props.height}
      id="gameCanvas"
    />
  );
}
