// LoginForm.jsx
import { useState, useContext } from 'react';
import { Form, Input, Button, ButtonContainer } from '../components/StyledComponents.js';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../service/api.js';
import PropTypes from 'prop-types';
import { setCookie } from '../utils/Cookie.js';
import { AuthContext } from '../service/AuthContext.jsx';

const LoginForm = ({ setAuthToken }) => {
  const { setAuthData } = useContext(AuthContext);
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  LoginForm.propTypes = {
    setAuthToken: PropTypes.func.isRequired,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 로그인 로직
    const response = await fetch(`${API_URL}/collections/users/auth-with-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity, password }),
    });
    const data = await response.json();

    if (response.ok) {
      console.log(data.record.username);
      setCookie(data.token, data.record);
      //쿠키 설정후 토큰에 저장한다
      setAuthToken(data.token);
      //사용자 정보의 일부를 전역에 저장
      setAuthData(data.record);
      navigate('/');
    } else {
      console.error('Login failed:', data);
      alert('로그인 실패');
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Email 또는 Id" value={identity} onChange={(e) => setIdentity(e.target.value)} />
        <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
        <ButtonContainer>
          <Button type="submit">로그인</Button>
          <Button onClick={() => navigate('/signup')}>회원가입</Button>
        </ButtonContainer>
      </Form>
    </div>
  );
};

export default LoginForm;
