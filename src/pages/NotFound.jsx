import '../styles.css';
import styled from 'styled-components';

const StyledNotFound = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const StyledTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: var(--text-primary);
`;

const StyledContent = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const NotFound = () => {
  return (
    <StyledNotFound>
      <StyledTitle>404 - Page Not Found</StyledTitle>
      <StyledContent>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</StyledContent>
    </StyledNotFound>
  );
};

export default NotFound;
