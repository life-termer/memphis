import { useGameStats } from "../hooks/useGameStats";

const GameOver = ({ onClick }) => {
    const [gameStats, addLinesCleared] = useGameStats();
    const { level, points, linesCompleted, linesPerLevel } = gameStats;
  return (
    <div className="menu menu--game-over">
        <p>Game Over</p>
        <div className="game-score">Your score: {points}</div>
        <div className="game-score">Your level: {level}</div>
        <div className="menu-btn" onClick={onClick}>
            <p>Main Menu</p>
        </div>
    </div>
  )
}
  
export default GameOver;