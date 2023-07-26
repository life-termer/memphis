import React, { useState } from "react";

export default function Cell({ details, updateFlag, revealcell }) {
  const [active, setActive] = useState('');
  const handleMouseDown = (e) => {
    e = e || window.event;
    if ("buttons" in e && e.buttons == 1) {
        setActive('active');
    }
    var button = e.which || e.button;
    if(button == 1)  {
      setActive('active');
    }
  }
  const handleMouseUp = (e) => {
    setActive('');
  }
  const handleMouseLeave = (e) => {
    setActive('');
  }
  return (
    <div
      className={details.revealed ? "board-cell-closed revealed " + details.flagged + ' ' + active :  "board-cell-closed " + details.flagged + ' ' + active }
      onClick={()=>{revealcell(details.x,details.y)}}
      onContextMenu={(e) => updateFlag(e,details.x,details.y)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {details.revealed ? details.value : ""}
    </div>
  );
}
