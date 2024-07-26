import Preview from "./preview";
import React from "react";

const Previews = ({ tertominoes }) => {

  // We want everything except the last one
  const previewTetrominoes = tertominoes
    .slice(1 - tertominoes.length)
    .reverse();
  return (
    <div className="previews">
      {previewTetrominoes.map((tetromino, index) => 
        <Preview tetromino={tetromino} index={index} key={index}/>
      )}
    </div>
  );
};
//memo lets you skip re-rendering a component when its props are unchanged
export default React.memo(Previews);
