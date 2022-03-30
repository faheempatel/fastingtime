import React from 'react';
import styles from './LocationMenu.module.css';

import { NAV_BAR_VARIANTS } from './variants';
import fastingTimes from '../times.json';
import crossIcon from '../assets/icons/cross.svg';

import { make as NavBar } from '../components/NavBar/NavBar.bs';
import { make as Container } from '../components/Layout/Container.bs';

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
            <li
              key={id}
              className={`${styles['heading']} ${styles['selected']}`}
              data-id={id}
            >
              {displayText}
            </li>
          ) : (
            <li key={id} className={styles['heading']} data-id={id}>
              {displayText}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Container>
      <NavBar
        title={'Change location'}
        icon={crossIcon}
        onClick={onClose}
        variant={NAV_BAR_VARIANTS.SMALL_ICON}
      />
      {renderLocations()}
    </Container>
  );
};
