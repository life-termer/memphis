import Preview from "./preview";
import React from "react";

const Previews = ({ tertominoes }) => {

  // We want everything except the last one
  const previewTetrominoes = tertominoes
    .slice(1 - tertominoes.length)
    .reverse();

  return (
    <>
      {previewTetrominoes.map((tetromino, index) => {
        <Preview tetromino={tetromino} index={index} key={index}/>
      })}
    </>
  );
};
export default React.memo(Previews);
