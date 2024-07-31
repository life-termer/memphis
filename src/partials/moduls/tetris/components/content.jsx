import Menu from "./menu";
import { useGameOver } from "../hooks/useGameOver";
import { useGameLost } from "../hooks/useGameLost";
import Game from "../../tetris/components/game";
import GameOver from "./gameOver";

const Content = ({ rows, columns }) => {
  //custom hook
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const [gameLost, setGameLost, resetGameLost] = useGameLost();
  const start = () => {
    resetGameOver();
  };
  const mainMenu = () => {
    setGameOver(true);
    resetGameLost();
  };

  return (
    <div className="content-inner">
      {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Game rows={rows} columns={columns} setGameOver={setGameOver} setGameLost={setGameLost} />
      )}
      {gameLost ? (
        <GameOver onClick={mainMenu} />
      ): ("")}
    </div>
  );
};
export default Content;
