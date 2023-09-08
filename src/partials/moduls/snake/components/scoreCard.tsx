import { useSelector } from "react-redux";
import { IGlobalState } from "../store/reducers/reducers";

const ScoreCard = () => {
    const score = useSelector((state: IGlobalState) => state.score);
    return (
        <div className="snake-score">Current Score: {score}</div>
    );
}

export default ScoreCard;