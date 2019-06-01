import { h } from 'preact';
import styled from 'preact-emotion';

const Container = styled('div')`
  display: flex;
  align-items: center;
  height: 57px;

  h3 {
    font-weight: 800;
    text-transform: uppercase;
  }
`;

const IndicatorLight = styled('div')`
  width: 9px;
  height: 9px;
  margin-top: -1px;
  margin-right: 9px;
  border-radius: 100px;
  background-color: ${props => (props.fastHasStarted ? '#F63433' : ' #7DBC4B')};
`;

const EatStatus = ({ fastHasStarted }) => (
  <Container>
    <IndicatorLight fastHasStarted={fastHasStarted} />
    <h3>{fastHasStarted ? 'CAN’T EAT' : 'CAN EAT'}</h3>
  </Container>
);

export default EatStatus;
