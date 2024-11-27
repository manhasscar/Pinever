// SignupForm.jsx
import { useState } from 'react';
import { Form, Input, Button } from '../components/StyledComponents';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../service/api.js';
import '../styles.css';
const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickName, setNickName] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (/\s/.test(nickName)) {
      alert('닉네임에 공백이 포함될 수 없습니다.');
      return;
    }

    // 회원가입 로직
    const response = await fetch(`${API_URL}/collections/users/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password, passwordConfirm, nick_name: nickName, real_name: name }),
    });
    const resultData = await response.json();
    if (response.ok) {
      console.log('Signup successful:', resultData);
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    } else {
      console.error('Signup failed:', resultData);
      if (resultData.data.email) {
        alert('이미 존재하는 이메일입니다.');
        return;
      }
      if (resultData.data.username) {
        alert('이미 존재하는 아이디입니다.');
        return;
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input type="password" placeholder="비밀번호 확인" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
      <Input type="name" placeholder="실명" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="nickName" placeholder="닉네임" value={nickName} onChange={(e) => setNickName(e.target.value)} />
      <Button type="submit">회원가입</Button>
    </Form>
  );
};

export default SignupForm;
