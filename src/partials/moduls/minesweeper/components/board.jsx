import React from "react";
import Cell from "./cell";

export default function Board({ grid, updateFlag, revealcell }) {

  return (
    <div className="board">
      {grid.map((singlerow, index) => {
        return (
          <div id={index} key={index} className="board-row">
            {singlerow.map((singlecol, index2) => {
              return (
                <div
                  id={index * 10 + index2}
                  key={index * 10 + index2}
                  className={"board-cell " + singlecol.value}
                >{singlecol.value}
                  <Cell details={singlecol} updateFlag={updateFlag} revealcell={revealcell} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
