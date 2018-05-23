import { h } from 'preact';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  p {
    font-weight: 800;
    text-transform: uppercase;
  }
`;

const IndicatorLight = styled.div`
  width: 9px;
  height: 9px;
  margin-right: 8px;
  border-radius: 100px;
  background-color: ${props => (props.fastHasStarted ? '#F63433' : ' #7DBC4B')};
`;

export default ({ fastHasStarted }) => (
  <Container>
    <IndicatorLight fastHasStarted={fastHasStarted} />
    <p>{fastHasStarted ? "CAN'T EAT" : 'CAN EAT'}</p>
  </Container>
);
