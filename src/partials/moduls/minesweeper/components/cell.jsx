import React, { useState } from "react";

export default function Cell({ details, updateFlag, revealcell }) {
 
  return (
    <div
      className={details.revealed ? "board-cell-closed revealed " + details.flagged :  "board-cell-closed " + details.flagged }
      onClick={()=>{revealcell(details.x,details.y)}}
      onContextMenu={(e) => updateFlag(e,details.x,details.y)}
    >
      {details.revealed ? details.value : ""}
    </div>
  );
}
