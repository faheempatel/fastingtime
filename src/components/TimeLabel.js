import { h } from 'preact';
import styled from 'styled-components';

const Label = styled.p`
  font-weight: 600;
  color: var(--grey);
`;
const Time = styled.h2`
  font-weight: 800;
`;

export default ({ text, time }) => (
  <div>
    <Label>{text}</Label>
    <Time>{time}</Time>
  </div>
);
