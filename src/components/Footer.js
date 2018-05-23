import { h } from 'preact';
import styled from 'styled-components';

const Footer = styled.div`
  p {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.000896517em;
    line-height: 20px;
    text-align: center;
  }

  p, a {
    color: #bbc0c3;
  }
`;

export default () => (
  <Footer>
    <p>
      Made by <a href="https://twitter.com/faheempatel">Faheem</a>
    </p>
    <p>Please keep me in your duas 🙏🏼</p>
  </Footer>
);
