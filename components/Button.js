import { h } from 'preact';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 64px;
  margin-top: 24px;
  margin-bottom: 16px;

  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  outline: 0;
  border-radius: 100px;
  background-color: #000;
  color: white;
  font-weight: bold;

  p {
    line-height: 0;
    text-transform: capitalize;
  }
`;

export default ({ text }) => (
  <Button>
    <p>{text}</p>
  </Button>
);
