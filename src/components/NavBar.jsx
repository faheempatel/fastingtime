import styled from '@emotion/styled';

import { NAV_BAR_VARIANTS } from './variants';
import mapPinIcon from '../assets/icons/map-pin.svg';

const NavBarContainer = styled('nav')`
  display: flex;
  align-items: center;
  min-height: 47px;
  margin-bottom: 16px;

  text-align: center;

  .titles {
    width: ${props => (props.hasIcon ? 'calc(100% - 48px)' : '100%')};
    user-select: none;
  }

  h4 {
    font-weight: 800;
  }

  p {
    font-weight: 500;
    color: var(--grey);
  }
`;

const Icon = styled('button')`
  width: 24px;
  height: 24px;

  background: url(${props => props.icon});
  background-size: contain;
  background-repeat: no-repeat;
  border: none;

  cursor: pointer;
`;

const SmallIcon = styled(Icon)`
  width: 20px;
  height: 20px;
`;

const NavBar = ({ title, subtitle, icon, onClick, variant }) => {
  return (
    <NavBarContainer hasIcon={icon}>
      {icon &&
        (variant === NAV_BAR_VARIANTS.SMALL_ICON ? (
          <SmallIcon icon={icon} onClick={onClick} />
        ) : (
          <Icon icon={icon} onClick={onClick} />
        ))}
      <div className="titles">
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
    </NavBarContainer>
  );
};

export const NavBarWithLocationMenu = props => (
  <NavBar {...props} icon={mapPinIcon} />
);

export default NavBar;
