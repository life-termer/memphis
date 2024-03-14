import Board from "../../tetris/components/board";
import { useBoard } from "../hooks/useBoard";
import { useGameStats } from "../hooks/useGameStats";
import GameStats from "./gameStats";
import Previews from "./previews";

const Game = ({ rows, columns, setGameOver }) => {
  const [board, setBoard] = useBoard({ rows, columns });
  const [gameStats, addLinesCleared] = useGameStats();
  const player = { tetrominoes: [] };

  return (
    <div className="game">
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews tertominoes={player.tetrominoes} />
    </div>
  );
};
export default Game;
