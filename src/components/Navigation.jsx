import '../styles/components/Navigation.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/img/logo.png';

const Navigation = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    const handleMenuClick = (action) => {
        setIsMenuOpen(false); // 메뉴 닫기
        if (typeof action === 'function') {
            action(); // 전달된 액션 실행 (예: handleLogout, navigate)
        }
    };

    const authToken = getCookie('authToken');

    useEffect(() => {
        if (authToken !== null) {
            setIsLogin(true);
        }
    }, [authToken]);

    // 외부 클릭 감지를 위한 useEffect 추가
    useEffect(() => {
        const handleClickOutside = (event) => {
            // 햄버거 메뉴 영역을 클릭하지 않았고, 메뉴가 열려있을 때만 실행
            if (isMenuOpen && !event.target.closest('.hamburger-menu')) {
                setIsMenuOpen(false);
            }
        };

        // document에 이벤트 리스너 추가
        document.addEventListener('mousedown', handleClickOutside);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]); // isMenuOpen이 변경될 때마다 useEffect 실행

    const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    const handleLogout = () => {
        deleteCookie('authToken');
        setIsLogin(false);
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link className="nav-title" to="/">
                        <img className="logo" src={logo} alt="PinEver" />
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/">마이볼링</Link>
                </li>
                <li className="nav-item">
                    <Link to="/record">점수 등록</Link>
                </li>
            </ul>

            <div className="nav-right">
                <div className="hamburger-menu">
                    <button className={`hamburger-button ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="메뉴">
                        <div className="hamburger-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>

                    {isMenuOpen && (
                        <div className="menu-dropdown">
                            <Link to="/profile" onClick={() => handleMenuClick()}>
                                <i className="fas fa-user"></i>
                                프로필
                            </Link>
                            <Link to="/record" onClick={() => handleMenuClick()}>
                                <i className="fas fa-record"></i>
                                점수 등록
                            </Link>
                            {isLogin ? (
                                <button onClick={() => handleMenuClick(handleLogout)}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    로그아웃
                                </button>
                            ) : (
                                <button onClick={() => handleMenuClick(() => navigate('/login'))}>
                                    <i className="fas fa-sign-in-alt"></i>
                                    로그인
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
