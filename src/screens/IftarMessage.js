import { h } from 'preact';
import styled from 'preact-emotion';

import Container from '../components/Container';
import { CONTAINER_VARIANTS } from '../components/variants';

const IftarMessage = styled('div')`
  position: absolute;
  left: 0;
  top: 0;
  padding: 24px;

  width: 100%;
  height: 100%;

  background-color: #7dbc4b;

  h1 {
    line-height: 1;
    font-size: 70px;
    font-weight: 800;
    color: white;
    text-transform: uppercase;
  }
`;

export default () => (
  <Container variant={CONTAINER_VARIANTS.IFTAR_SCREEN}>
    <IftarMessage>
      <h1>Time to break your fast</h1>
    </IftarMessage>
  </Container>
);
