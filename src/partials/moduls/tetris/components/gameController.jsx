import {Action, actionForKey} from "../business/input";
import { playerController } from "../business/playerController";

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
}) => {

  const onKeyDown = ({code}) => {
    console.log(`onKeyUp ${code}`);
    const action = actionForKey(code);
    handleInput({action})
  }

  const onKeyUp = ({code}) => {
    console.log(`onKeyDown ${code}`);
    const action = actionForKey(code);
    if(action === Action.Quit) {
      setGameOver(true);
    }
  }

  const handleInput = ({action}) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver
    })
  }

  return (
    <input
      className="gameController"
      type="text"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      autoFocus
      onBlur={({ target }) => target.focus()}
    />
  );

}

export default GameController;