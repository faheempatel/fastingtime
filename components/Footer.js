import { h } from 'preact';
import styled from 'styled-components';

const Footer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;

  p {
    font-size: 14px;
    letter-spacing: 0.000896517em;
    line-height: 20px;
    text-align: center;
    color: var(--grey);
  }

  a {
    color: var(--grey);
    font-weight: 500;
  }
`;

export default () => (
  <Footer>
    <p>
      Made by <a href="https://twitter.com/faheempatel">Faheem</a>
    </p>
    <p>Please remember me in your duas 🙏🏼</p>
  </Footer>
);
