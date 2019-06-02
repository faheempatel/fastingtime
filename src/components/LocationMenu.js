import { h } from 'preact';
import styled from 'preact-emotion';

import fastingTimes from '../times.json';

import AppContainer from './AppContainer';
import NavBar from './NavBar';

// TODO: MOVE THESE INTO A UTILITY FOLDER
const Heading = styled('li')`
  margin-top: 32px;
  font-size: 24px;
  font-weight: 800;
  color: var(--grey);
  text-transform: capitalize;
  cursor: pointer;
`;
const SelectedHeading = styled(Heading)`
  color: var(--black);
`;

const LocationMenu = ({
  selectedLocation,
  onLocationClick,
  onNavBarClick,
  navBarVariant
}) => {
  const renderLocations = () => {
    const locations = Object.keys(fastingTimes).sort();
    return (
      <ul>
        {locations.map(location =>
          location === selectedLocation ? (
            <SelectedHeading>{location}</SelectedHeading>
          ) : (
            <Heading onClick={onLocationClick}>{location}</Heading>
          )
        )}
      </ul>
    );
  };

  const crossIconUrl = '../assets/icons/cross.svg';

  return (
    <AppContainer>
      <NavBar
        title={'Change Location'}
        icon={crossIconUrl}
        onClick={onNavBarClick}
        variant={navBarVariant}
      />
      {renderLocations()}
    </AppContainer>
  );
};

export default LocationMenu;
