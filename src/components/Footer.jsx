import styled from '@emotion/styled';

const Footer = styled('div')`
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

export default () => (
  <Footer>
    <p>
      Made by <a href="https://github.com/faheempatel">Faheem</a>
    </p>
    <p>Please keep me in your duas 🙏🏼</p>
  </Footer>
);
