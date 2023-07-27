export default function CreateBoard(row, col) {
  // Board for storing the values for each cell
  let board = [];

  // Create blank board

  for (let x = 0; x < row; x++) {
    let subCol = [];
    for (let y = 0; y < col; y++) {
      subCol.push({
        value: 0,
        revealed: false,
        x: x,
        y: y,
        flagged: false,
      });
    }
    board.push(subCol);
  }

    return { board };
}

