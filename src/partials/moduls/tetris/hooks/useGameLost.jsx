import { useCallback, useState } from "react";

export const useGameLost = () => {
  const [gameLost, setGameLost] = useState(false);

  const resetGameLost = useCallback(() => {
    setGameLost(false);
  }, []);

  return [gameLost, setGameLost, resetGameLost];
};
