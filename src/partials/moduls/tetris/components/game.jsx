import Board from "../../tetris/components/board";
import { useBoard } from "../hooks/useBoard";
import { useGameStats } from "../hooks/useGameStats";
import { usePlayer } from "../hooks/usePlayer";
import GameStats from "./gameStats";
import Previews from "./previews";
import GameController from "./gameController";

const Game = ({ rows, columns, setGameOver }) => {

  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board, setBoard] = useBoard({ 
    rows, 
    columns,
    player,
    resetPlayer,
    addLinesCleared
  });

  return (
    <div className="game">
      <Previews tertominoes={player.tetrominoes} />
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <GameController 
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
      />
    </div>
  );
};
export default Game;
