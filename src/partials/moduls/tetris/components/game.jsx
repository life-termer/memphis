import Board from "../../minesweeper/components/board";
import { useBoard } from "../hooks/useBoard";

const Game = ({ rows, columns, setGameOver }) => {
  
  const [board, setBoard] = useBoard({ rows, columns });

  return (
    <div className="game">
      <Board board={board}/>
    </div>
  );
};
export default Game;
