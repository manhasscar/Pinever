// 필요한 리액트 훅과 라우터 컴포넌트들을 임포트
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// 커스텀 컴포넌트들 임포트
import Navigation from './components/Navigation';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import Record from './pages/Record';
import { getCookie } from './utils/Cookie.js';
import { AuthProvider } from './service/AuthContext.jsx';
import './styles.css';
function App() {
    // 인증 토큰 상태 관리 (초기값은 쿠키에서 가져옴)
    const [authToken, setAuthToken] = useState(() => getCookie('authToken'));
    // 인증 토큰이 변경될 때마다 쿠키값 업데이트
    useEffect(() => {
        setAuthToken(getCookie('authToken'));
    }, [authToken]);

    return (
        <AuthProvider>
            <Router>
                <Navigation />
                <Routes>
                    {authToken ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/record" element={<Record />} />
                            <Route path="/login" element={<LoginForm setAuthToken={setAuthToken} />} />
                            <Route path="/signup" element={<SignupForm />} />
                            <Route path="*" element={<NotFound />} />
                        </>
                    ) : (
                        // 비인증 사용자일 경우의 라우트 구성
                        // 로그인과 회원가입 페이지만 접근 가능하며, 다른 모든 경로는 로그인 페이지로 리다이렉트
                        <>
                            <Route path="/login" element={<LoginForm setAuthToken={setAuthToken} />} />
                            <Route path="/signup" element={<SignupForm />} />
                            <Route path="*" element={<Navigate to="/login" state={{ from: window.location.pathname }} replace />} />
                        </>
                    )}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
