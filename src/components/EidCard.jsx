import styled from '@emotion/styled';

import partyPopperEmoji from '../assets/party-popper-emoji.png';
import Container from './Container';

const InnerContainer = styled('div')`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  h1 {
    margin-top: 16px;
    text-align: center;
    font-size: 64px;
    font-weight: 800;
    line-height: 110%;
  }

  p {
    margin-top: 1.3em;
  }

  p,
  a {
    color: #657382;
  }

  a {
    text-decoration: none;
    border-bottom: 1px solid;
  }

  a:hover {
    font-weight: 700;
    border-bottom: 2px solid;
  }

  div {
    width: 90%;
    margin: 0 auto;
    margin-top: 8px;
    margin-bottom: 24px;
  }

  .emoji {
    margin-top: 24px;
    width: 80px;
    height: 80px;
  }
`;

const EidCard = () => (
  <Container>
    <InnerContainer>
      <h1>Eid Mubarak!</h1>
      <img class="emoji" src={partyPopperEmoji} alt="" />
      <div>
        <p>May Allah bless you with a great day!</p>
        <p>
          I hope this Ramadan has been beneficial as well as healing. I pray our
          good acts have been accepted and that we see them continue.
        </p>
        <p>
          I hope FastingTime has been useful, it was a lot of fun to build, so
          thank you for using it. It means a lot.
        </p>
        <p>
          As always, please keep me in your duas, and see you next Ramadan
          inshaAllah!
        </p>
        <p>
          JazakAllah khair,
          <br />
          <a href="https://github.com/faheempatel">Faheem</a>
        </p>
      </div>
    </InnerContainer>
  </Container>
);

export default EidCard;
