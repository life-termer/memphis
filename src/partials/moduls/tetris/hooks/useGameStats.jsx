import { useCallback, useState } from "react";

const buildGamesStats = () => ({
  level: 1,
  linesCompleted: 0,
  linesPerLevel: 10,
  points: 0,
});

export const useGameStats = () => {
  const [gameStats, setGameStats] = useState(buildGamesStats());

  const addLinesCleared = useCallback(() => {}, []);

  return [gameStats, addLinesCleared];

}