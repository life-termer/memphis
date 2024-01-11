import { useSelector } from "react-redux";
import { IGlobalState } from "../store/reducers/reducers";

export interface IBestScore {
    bestScore: number;
    setBestScore: any;
  }

const BestScore = ({ bestScore, setBestScore }: IBestScore) => {
    const score = useSelector((state: IGlobalState) => state.score);
    return (
        <div className="best-score"> Best Score: {bestScore}</div>
    );
}

export default BestScore;