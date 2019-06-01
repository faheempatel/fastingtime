import { h } from 'preact';
import styled from 'preact-emotion';

const StyledButton = styled('button')`
  width: 100%;
  height: 64px;
  margin-top: 24px;
  margin-bottom: 16px;

  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  outline: 0;
  border: 0;
  border-radius: 100px;
  background-color: var(--button-color);
  color: var(--button-text-color);
  font-weight: 700;

  :hover {
    cursor: pointer;
  }

  p {
    line-height: 0;
    text-transform: capitalize;
  }

  a {
    color: white;
    text-decoration: none;
  }
`;

const Button = ({ text, onClick }) => (
  <StyledButton onClick={onClick}>
    <p>{text}</p>
  </StyledButton>
);

export default Button;
