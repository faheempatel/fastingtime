import { h } from 'preact';
import styled from 'preact-emotion';

const OuterContainer = styled('div')`
  @media only screen and (min-width: 600px) {
    display: flex;
  }

  @media only screen and (min-width: 600px) and (min-height: 675px) {
    min-height: 100vh;
  }
`;

const AppContainer = styled('div')`
  width: 100%;
  min-height: 100vh;
  margin: auto;
  padding: 16px 24px;
  background-color: #fff;
  overflow-y: scroll;

  @media only screen and (min-width: 600px) {
    width: 375px;
    min-height: 100%;
  }

  /* Tablet and above */
  @media only screen and (min-width: 600px) and (min-height: 675px) {
    width: 400px;
    max-height: 674px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
      0 5px 15px rgba(0, 0, 0, 0.07);
    border-radius: 16px;
  }
`;

export default ({ children }) => (
  <OuterContainer>
    <AppContainer>{children}</AppContainer>
  </OuterContainer>
);
