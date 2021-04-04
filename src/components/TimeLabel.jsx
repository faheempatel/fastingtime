import styled from '@emotion/styled';

const Label = styled('p')`
  font-weight: 700;
  color: var(--grey);
`;
const Time = styled('h2')`
  font-weight: 800;
`;

export default ({ text, time }) => (
  <div>
    <Label>{text}</Label>
    <Time>{time}</Time>
  </div>
);
