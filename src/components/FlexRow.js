import { h } from 'preact';
import styled from 'preact-emotion';

const FlexRow = styled('div')`
  display: flex;
  justify-content: space-between;
  max-width: 375px;

  margin: 0 auto;
  padding: 0 24px;
`;

export default FlexRow;
