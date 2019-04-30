import { h } from 'preact';
import styled from 'preact-emotion';

const NavBar = styled('nav')`
  display: flex;
  align-items: center;
  min-height: 47px;

  text-align: center;

  .titles {
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

const Icon = styled('div')`
  width: 24px;
  height: 24px;

  background: url(${props => props.icon});
  background-size: contain;
  background-repeat: no-repeat;

  cursor: pointer;
`;

export default ({ title, subtitle, icon, onClick }) => (
  <NavBar>
    <Icon icon={icon} onClick={onClick} />
    <div className="titles">
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>
  </NavBar>
);
