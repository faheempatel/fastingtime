import { h } from 'preact';
import styled from 'preact-emotion';

const OuterContainer = styled('div')`
  @media only screen and (min-width: 600px) {
    display: flex;
  }

  @media only screen and (min-width: 600px) and (min-height: 720px) {
    min-height: 100vh;
  }
`;

const AppContainer = styled('div')`
  width: 100%;
  margin: auto;
  padding: 16px 24px;
  background-color: #fff;

  @media only screen and (min-width: 600px) {
    max-width: 375px;
  }

  @media only screen and (min-width: 600px) and (min-height: 720px) {
    max-width: 400px;
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
