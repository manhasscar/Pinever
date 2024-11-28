import '../styles/components/GameScoreCard.css';
import PropTypes from 'prop-types';

const GameScoreCard = ({ gameData }) => {
    GameScoreCard.propTypes = {
        gameData: PropTypes.object.isRequired,
    };

    const gameDate = new Date(gameData.date).toISOString().split('T')[0];

    return (
        <div className="game-score">
            <div className="game-info">
                <span className="date">{gameDate}</span>
                <span className="location">{gameData.bowling_center_name}</span>
            </div>
            <div className="scores">
                {gameData.scores.map((score, index) =>
                    score >= 200 ? (
                        <div className="score-over-200 score" key={index}>
                            {score}
                        </div>
                    ) : (
                        <div className="score" key={index}>
                            {score}
                        </div>
                    )
                )}
            </div>
            <div className="total-info">
                <div className="total-score">{gameData.sum_score}</div>
                {gameData.average_score >= 200 ? <div className="average-over-200">{gameData.average_score}</div> : <div className="average">{gameData.average_score}</div>}
            </div>
        </div>
    );
};

export default GameScoreCard;
