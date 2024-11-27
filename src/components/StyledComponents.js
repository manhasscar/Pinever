// StyledComponents.js
import styled from 'styled-components';

// export const Form = styled.form`
//   display: flex;
//   top: 20%;
//   flex-direction: column;
//   align-items: center;
//   background-color: #f9f9f9;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   max-width: 400px;
//   margin: 20px auto;
// `;

// export const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin: 10px 0;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   font-size: 16px;
//   &:focus {
//     border-color: #007bff;
//     outline: none;
//   }
// `;

// export const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   font-size: 16px;
//   cursor: pointer;
//   transition: background-color 0.3s;
//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// export const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   gap: 10px;
// `;

// ... existing imports ...

export const Form = styled.form`
  display: flex;
  width: 100%;
  top: 20%;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, var(--secondary-black) 0%, var(--primary-black) 50%, var(--primary-black) 100%);
  box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.1), inset 0 0 30px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 20px auto;
  color: white;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.05);
  color: white;

  &:focus {
    border-color: rgba(255, 215, 0, 0.4);
    outline: none;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.05);

  &:hover {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 1);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

// ... rest of the file ...
