import {Action, actionForKey, actionIsDrop} from "../business/input";
import { playerController } from "../business/playerController";
import { useInterval } from "../hooks/useInterval";
import { useDropTime } from "../hooks/useDropTime";

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
  setGameLost
}) => {

  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats
  });

  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);

  const onKeyDown = ({code}) => {
    //console.log(`onKeyUp ${code}`);
    const action = actionForKey(code);

    if(action === Action.Pause) {
      if(dropTime) {
        pauseDropTime();
      } else {
        resumeDropTime();
      }
    } else if (action === Action.Quit) {
      setGameOver(true);
      setGameLost(false);
    } else {
      if(actionIsDrop(action)) pauseDropTime();
      handleInput({action})
    }
  }

  const onKeyUp = ({code}) => {
    const action = actionForKey(code);
    if(actionIsDrop(action)) resumeDropTime();
  }

  const handleInput = ({action}) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
      setGameLost,
      pauseDropTime
    })
  }

  return (
    <input
      className="gameController"
      type="text"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      autoFocus
    />
  );

}

export default GameController;