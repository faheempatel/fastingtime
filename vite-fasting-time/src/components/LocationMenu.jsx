import { Component } from 'preact';
import styled from '@emotion/styled';

import { NAV_BAR_VARIANTS } from './variants';
import fastingTimes from '../times.json';
import crossIcon from '../assets/icons/cross.svg';

import Container from './Container';
import NavBar from './NavBar';

// TODO: MOVE THESE INTO A UTILITY FOLDER
const Heading = styled('li')`
  margin-top: 32px;
  font-size: 24px;
  font-weight: 800;
  color: var(--grey);
  text-transform: capitalize;
  cursor: pointer;
  user-select: none;
`;
const SelectedHeading = styled(Heading)`
  color: var(--black);
`;

const locationIds = Object.keys(fastingTimes.locations);
const londonId = locationIds[0];

// TODO: this needs to be cleaned up
// ----------------------------------
// Sorted in alphabetical order but with London first
const sortedLocationIds = [
  londonId,
  ...locationIds
    .slice(1)
    .sort((a, b) =>
      fastingTimes.locations[a].name.toLowerCase() >=
      fastingTimes.locations[b].name.toLowerCase()
        ? 1
        : -1
    )
];

export default ({
  selectedLocation,
  onLocationSelection,
  onClose,
  navBarVariant
}) => {
  const renderLocations = () => {
    return (
      <ul onClick={onLocationSelection}>
        {sortedLocationIds.map(id => {
          const location = fastingTimes.locations[id];
          const region = fastingTimes.regions[location.region];
          const displayText = `${location.name}, ${region.code}`;
          return id === selectedLocation ? (
            <SelectedHeading data-id={id}>{displayText}</SelectedHeading>
          ) : (
            <Heading data-id={id}>{displayText}</Heading>
          );
        })}
      </ul>
    );
  };

  return (
    <Container>
      <NavBar
        title={'Change Location'}
        icon={crossIcon}
        onClick={onClose}
        variant={NAV_BAR_VARIANTS.SMALL_ICON}
      />
      {renderLocations()}
    </Container>
  );
};
