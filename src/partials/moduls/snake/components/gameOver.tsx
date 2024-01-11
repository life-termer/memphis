export interface IGameOver {
    score: number;
    bestScore: number;
    isBestScore: boolean;
  }

const GameOver = ({score, bestScore, isBestScore}: IGameOver) => {
    return (
        <div className="snake-game-over">
                <h1>Game Over</h1>
                {isBestScore ? (<h2>--!!Best Score!!--</h2> ) : ("") }
                <h3>Your score is {score} </h3>
        </div>
    );
}

export default GameOver;