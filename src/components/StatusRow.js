import { h } from 'preact';
import styled from 'preact-emotion';

import FlexRow from './FlexRow';
import EatStatus from './EatStatus';

const Container = styled(FlexRow)`
  margin-top: 16px;
  align-items: center;
  padding: 8px 20px;

  button {
    margin-left: -15px;
    outline: 0;
    border: 3px solid var(--light-grey);
    border-radius: 100px;
    padding: 9px 22px;
    background: white;
    cursor: pointer;

    p {
      color: var(--grey);
      font-weight: 700;
      text-transform: capitalize;
    }
  }
`;

const StatusRow = ({ fastHasStarted, selectedLocation, onButtonClick }) => (
  <Container>
    <button onClick={onButtonClick}>
      <p>{selectedLocation}, UK</p>
    </button>
    <div className="separator" />
    <EatStatus fastHasStarted={fastHasStarted} />
  </Container>
);

export default StatusRow;
