export default function PlaceMines(board, row, col, bombs, firstX, firstY) {
  // Tracking the minelocation
  let mineLocation = [];
  // Randomize Bomb Placement
  let bombsCount = 0;
  console.log("first click " + firstX + " " + firstY);
  while (bombsCount < bombs) {
    // Implementing random function
    let x;
    let y = random(0, col - 1);
    while(true) {
      x = random(0, row - 1);
      console.log("x " + x + " : y " + y);
      if(x !== firstX) {
        break;
      }
    }

    // placing bomb at random location(x,y) on board[x][y]
    if (board[x][y].value === 0) {
      board[x][y].value = "X";
      mineLocation.push([x, y]);
      bombsCount++;
    }
  }

  // Increasing the value of specific cell
  // If the cell has mines increasing the cell value by 1.
  // Add Numbers
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j].value === "X") {
        continue;
      }

      // Top
      if (i > 0 && board[i - 1][j].value === "X") {
        board[i][j].value++;
      }

      // Top Right
      if (i > 0 && j < col - 1 && board[i - 1][j + 1].value === "X") {
        board[i][j].value++;
      }

      // Right
      if (j < col - 1 && board[i][j + 1].value === "X") {
        board[i][j].value++;
      }

      // Botoom Right
      if (i < row - 1 && j < col - 1 && board[i + 1][j + 1].value === "X") {
        board[i][j].value++;
      }

      // Bottom
      if (i < row - 1 && board[i + 1][j].value === "X") {
        board[i][j].value++;
      }

      // Bottom Left
      if (i < row - 1 && j > 0 && board[i + 1][j - 1].value === "X") {
        board[i][j].value++;
      }

      // LEft
      if (j > 0 && board[i][j - 1].value === "X") {
        board[i][j].value++;
      }

      // Top Left
      if (i > 0 && j > 0 && board[i - 1][j - 1].value === "X") {
        board[i][j].value++;
      }
    }
  }
  return { board, mineLocation };
}

// Random function used for generating random value of x & y
function random(min = 0, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
