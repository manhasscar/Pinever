import '../styles.css';
import UserAverageCard from '../components/UserAverageCard';
import GameScoreCard from '../components/GameScoreCard';
import { getCookie } from '../utils/Cookie';
import { API_URL } from '../service/api.js';
import { useState, useEffect } from 'react';
import '../styles/pages/Home.css';
const Home = () => {
    const [gameData, setGameData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userData = JSON.parse(getCookie('userData'));
    console.log('userData', userData);
    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await fetch(`${API_URL}/collections/game_records/records?sort=-created&perPage=${5}&filter=(user_id='${userData.username}')`);
                const data = await response.json();
                setGameData(data.items);
            } catch (error) {
                console.error('데이터 불러오기 실패:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGameData();
    }, [userData.username]);
    console.log('gameData', gameData);

    return (
        <div className="container">
            <UserAverageCard userData={userData} />
            <p className="game-score-card-title">최근 5게임</p>
            <div className="game-score-card-wrapper">
                {gameData.length === 0 ? (
                    <div className="no-game-data">최근 게임이 없습니다</div>
                ) : isLoading ? (
                    <div className="loading">로딩중...</div>
                ) : (
                    gameData.map((game) => (
                        <div className="game-score-card" key={game.id}>
                            <GameScoreCard gameData={game} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
