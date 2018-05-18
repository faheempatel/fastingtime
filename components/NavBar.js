import { h } from 'preact';
import styled from 'styled-components';
import settingsIconUrl from '../assets/settings.svg';

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  text-align: center;

  .dates {
    width: calc(100% - 48px);
  }

  h4 {
    font-weight: 800;
  }

  p {
    font-weight: 500;
    color: var(--grey);
  }
`;

const SettingsButton = styled.div`
  width: 24px;
  height: 24px;
  background: url(${settingsIconUrl});
`;

export default ({ islamicDate, gregorianDate }) => (
  <NavBar>
    <SettingsButton />
    <div className="dates">
      <h4>{islamicDate}</h4>
      <p>{gregorianDate}</p>
    </div>
  </NavBar>
);
