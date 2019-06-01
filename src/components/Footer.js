import { h } from 'preact';
import styled from 'preact-emotion';

const Container = styled('div')`
  p {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.006em;
    line-height: 20px;
    text-align: center;
  }

  p,
  a {
    color: var(--grey);
  }
`;

const Footer = () => (
  <Container>
    <p>
      Made by <a href="https://twitter.com/faheempatel">Faheem</a>
    </p>
    <p>Please keep me in your duas 🙏🏼</p>
  </Container>
);

export default Footer;
