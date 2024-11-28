// 필요한 라이브러리 및 컴포넌트 import
import { useState, useCallback, useEffect } from 'react'; // useCallback을 사용하여 함수 메모이제이션
import Calendar from './DatePicker';
import '../styles/components/ScoreRecorder.css';
import { API_URL } from '../service/api.js';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/Cookie.js';
import { useDispatch } from 'react-redux';

// 매직넘버를 상수로 분리하여 코드의 가독성과 유지보수성 향상
const MAX_SCORE = 300;
const MIN_SCORE = 1;
const MAX_GAMES = 24;
const MAX_MEMO_LENGTH = 200;

// 에러 메시지 상수화로 일관성 있는 메시지 관리
const ERROR_MESSAGES = {
    INVALID_SCORE: (min, max) => `점수는 ${min}점 이상 ${max}점 이하여야 합니다.`,
    NO_CENTER_NAME: '볼링장 이름을 입력해주세요.',
    NO_SCORE: '점수를 입력해주세요.',
    SAVE_FAILED: '저장에 실패하였습니다. 다시 시도해 주세요',
};

const GameRecord = () => {
    // 상태 관리 - React hooks를 사용하여 컴포넌트의 상태 관리
    const [date, setDate] = useState(new Date());
    const [memo, setMemo] = useState('');
    const [scores, setScores] = useState(Array(MAX_GAMES).fill(''));
    const [bowlingCenterName, setBowlingCenterName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const saveButton = document.querySelector('.save-button');
        if (saveButton) {
            saveButton.disabled = true;
            saveButton.style.backgroundColor = '#ccc';
            saveButton.style.cursor = 'not-allowed';
        }
    }, []); // 빈 의존성 배열로 컴포넌트 마운트 시 한 번만 실행

    // useCallback을 사용하여 불필요한 리렌더링 방지
    const isValidScore = useCallback((value) => {
        if (!/^[0-9]*$/.test(value)) return false;
        const numberValue = Number(value);
        return value === '' || (numberValue >= MIN_SCORE && numberValue <= MAX_SCORE);
    }, []);

    // 저장 버튼 상태 업데이트 로직 분리
    const updateSaveButtonState = useCallback((hasEmptyScore) => {
        const saveButton = document.querySelector('.save-button');
        if (saveButton) {
            saveButton.disabled = hasEmptyScore;
            saveButton.style.backgroundColor = hasEmptyScore ? '#ccc' : 'rgba(79, 70, 229, 1)';
            saveButton.style.cursor = hasEmptyScore ? 'not-allowed' : 'pointer';
        }
    }, []);

    // 점수 변경 핸들러 최적화
    const handleScoreChange = useCallback(
        (index, value) => {
            if (!isValidScore(value)) {
                if (value !== '') {
                    alert(ERROR_MESSAGES.INVALID_SCORE(MIN_SCORE, MAX_SCORE));
                }
                return;
            }

            setScores((prevScores) => {
                const newScores = [...prevScores];
                newScores[index] = value ? Number(value) : '';
                const hasEmptyScore = newScores.every((score) => score === '');
                updateSaveButtonState(hasEmptyScore);
                return newScores;
            });
        },
        [isValidScore, updateSaveButtonState]
    );

    // 점수 통계 계산 함수
    const calculateScoreStats = (filteredScores) => {
        return {
            over200Scores: filteredScores.filter((score) => score >= 200),
            bestScore: Math.max(...filteredScores),
            worstScore: Math.min(...filteredScores),
            averageScore: +(filteredScores.reduce((sum, score) => sum + score, 0) / filteredScores.length), // 소수점 2자리까지 표시
            sumScore: filteredScores.reduce((sum, score) => sum + score, 0),
        };
    };

    // API 요청 로직 분리하여 재사용성 향상
    const saveGameRecord = async (recordData) => {
        const response = await fetch(`${API_URL}/collections/game_records/records`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recordData),
        });

        if (!response.ok) throw new Error('저장 실패');
        return response;
    };

    // 저장 핸들러 개선 - 유효성 검사와 에러 처리 강화
    const handleSave = async () => {
        if (!bowlingCenterName) {
            alert(ERROR_MESSAGES.NO_CENTER_NAME);
            return;
        }
        if (!scores[0]) {
            alert(ERROR_MESSAGES.NO_SCORE);
            return;
        }

        try {
            const user_id = getCookie('userId');
            const filteredScores = scores.filter(Boolean);
            const stats = calculateScoreStats(filteredScores);

            await saveGameRecord({
                date: date.toISOString(),
                user_id: user_id,
                memo: memo,
                scores: filteredScores,
                bowling_center_name: bowlingCenterName,
                best_score: stats.bestScore,
                average_score: stats.averageScore,
                sum_score: stats.sumScore,
                over_two_hundred_count: stats.over200Scores.length,
                worst_score: stats.worstScore,
            });

            dispatch({ type: 'UPDATE', isUpdate: true });
            alert('저장되었습니다.');
            navigate('/');
        } catch (error) {
            alert(ERROR_MESSAGES.SAVE_FAILED);
            console.error('Save error:', error);
        }
    };

    return (
        <div className="game-record">
            <header className="header">
                <input className="bowling-center-name" type="text" placeholder="볼링장 이름" value={bowlingCenterName} onChange={(e) => setBowlingCenterName(e.target.value)} />
                <button className="save-button" onClick={handleSave}>
                    저장
                </button>
            </header>
            <Calendar className="date-picker" value={date} onChange={setDate} />
            <div className="memo-wrapper">
                <div className="memo">
                    <textarea placeholder="메모를 입력해주세요..(200자)" maxLength={MAX_MEMO_LENGTH} value={memo} onChange={(e) => setMemo(e.target.value)} />
                </div>
            </div>
            <div className="score-grid">
                {scores.map((score, index) => (
                    <input key={index} type="text" placeholder={`G${index + 1}`} value={score} onChange={(e) => handleScoreChange(index, e.target.value)} className="score-input" />
                ))}
            </div>
        </div>
    );
};

export default GameRecord;
