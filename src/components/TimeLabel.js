import { h } from 'preact';
import styled from 'preact-emotion';

const Label = styled('p')`
  font-weight: 700;
  color: var(--grey);
`;
const Time = styled('h2')`
  font-weight: 800;
`;

const TimeLabel = ({ text, time }) => (
  <div>
    <Label>{text}</Label>
    <Time>{time}</Time>
  </div>
);

export default TimeLabel;
