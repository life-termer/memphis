import React, { useState } from "react";
import Cell from "./cell";

export default function Board({ grid, updateFlag, revealcell }) {
  const [cellColor, setCellcolor] = useState('');

  const setCellClass = (value) => {
    switch(value){
      case 0: {
        return 'empty';
      }
      case 1: {
        return 'c-blue';
      }
      case 2: {
        return 'c-green';
      }
      case 3: {
        return 'c-red';
      }
      case 4: {
        return 'c-dark-blue';
      }
      case 5: {
        return 'c-dark-red';
      }
      case 6: {
        return 'c-dark-green';
      }
      case 7: {
        return 'c-dark-blue';
      }
      case 8: {
        return 'c-black';
      }
      case 'X': {
        return 'x';
      }
  }
}
  
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
                  className={"board-cell " + setCellClass(singlecol.value)}
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
