import React from "react";
import { buildBoard } from "../business/business";
import { transferToBoard } from "../business/tetrominoes";
import BoardCell from "./boardCell";

const Preview = ({ tetromino, index }) => {
  const { shape, className } = tetromino;
  const board = buildBoard({rows: 4, columns: 4});
  const style = {top: `${index * 15}px`};

  board.rows = transferToBoard({
    className,
    isOccupied: false,
    position: {row: 0, column: 0},
    rows: board.rows,
    shape
  })
  return (
    <div className="preview"> 
      <div className="preview-board">
        {board.rows.map((row, y) =>
          row.map((cell, x) => 
            <BoardCell key={x * board.size.columns + x} cell={cell} />
          )
        )}
      </div>
    </div>
  );
};
export default Preview;
