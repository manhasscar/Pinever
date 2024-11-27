// 필요한 라이브러리 import
import { useState, useEffect } from 'react';
import '../styles/components/UserAverageCard.css';
import PropTypes from 'prop-types';
import { API_URL } from '../service/api.js';
import noProfile from '../assets/img/no_profile.png';

// PropTypes 정의를 컴포넌트 외부로 이동하여 가독성 향상
const propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    real_name: PropTypes.string.isRequired,
    nick_name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
};

const UserAverageCard = ({ userData }) => {
  // 상태 관리
  const [averageData, setAverageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animationTrigger, setAnimationTrigger] = useState(true);

  // 날짜 계산 로직을 상수로 분리하여 가독성 향상
  const startDate = new Date(userData.created).toISOString().split('T')[0];
  const todayDate = new Date().toISOString().split('T')[0];

  // 데이터 fetch 로직을 별도 함수로 분리하여 재사용성 향상
  const fetchAverageData = async (username) => {
    try {
      const response = await fetch(`${API_URL}/collections/average_scores/records?filter=(user_id='${username}')`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.items.length > 0 ? data.items[0] : null;
    } catch (error) {
      console.error('데이터 불러오기 실패:', error);
      return null;
    }
  };

  // 데이터 로딩 useEffect
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAverageData(userData.username);
      setAverageData(data);
      setIsLoading(false);
    };
    loadData();
  }, [userData.username]);

  // 애니메이션 관련 상수와 계산 로직
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const scorePercentage = averageData ? (averageData.average_score / 300) * 100 : 0;
  const offset = circumference - (scorePercentage / 100) * circumference;

  // 애니메이션 효과 useEffect
  useEffect(() => {
    if (averageData?.average_score) {
      const timer = setTimeout(() => {
        setAnimationTrigger(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [averageData?.average_score]);

  if (isLoading) {
    return <div className="loading">로딩중...</div>;
  }

  // 렌더링 로직을 더 명확하게 분리
  const renderHeader = () => (
    <div className="header">
      <img src={userData.avatar || noProfile} alt="Profile Icon" className="profile-icon" />
      <span className="username">
        {userData.real_name} ({userData.nick_name})
      </span>
    </div>
  );

  const renderAverageCircle = () => (
    <div className="average-circle">
      <div>
        <svg width="120" height="120">
          <circle className="circle-background" cx="60" cy="60" r={radius} stroke="#e0e0e0" strokeWidth="10" fill="none" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#76c7c0"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={animationTrigger ? circumference : offset}
            className="gauge"
            transform="rotate(90 60 60)"
          />
        </svg>
      </div>
      <span className="average-score">{averageData?.average_score?.toFixed(2) || '-'}</span>
      <span className="games-count">{averageData?.total_count || 0} Games</span>
    </div>
  );

  return (
    <div className="user-average">
      {renderHeader()}
      <div className="average-info">
        <span className="average-title">Total Average</span>
        <span className="date-range">
          {startDate} ~ {todayDate}
        </span>
        {renderAverageCircle()}
      </div>
      <div className="achievements">
        <div className="best-score">
          <span className="best-label">Best</span>
          <div className="best-score-badge">{averageData?.user_best_score || '-'}</div>
        </div>
        <div className="stats">
          <span>Over - 200: {averageData?.over_two_hundred_count || 0}</span>
        </div>
      </div>
      <div className="footer">
        {!averageData ? (
          <span>{userData.nick_name}님은 기록된 게임이 없습니다.</span>
        ) : (
          <span>
            {userData.nick_name}님의 최고, 최저 점수 편차는 {averageData.user_best_score - averageData.user_worst_score}점입니다.
          </span>
        )}
      </div>
    </div>
  );
};

UserAverageCard.propTypes = propTypes;

export default UserAverageCard;
