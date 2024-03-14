import Menu from "./menu";
import { useGameOver } from "../hooks/useGameOver";
import Game from "../../tetris/components/game";

const Content = ({ rows, columns }) => {
  //custom hook
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const start = () => {
    resetGameOver();
    // console.log(`On menu click. game over: ${gameOver}`);
  };

  return (
    <div className="content-inner">
      {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Game rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
    </div>
  );
};
export default Content;
