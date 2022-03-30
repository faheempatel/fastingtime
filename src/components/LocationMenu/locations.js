import fastingTimes from '../../times.json';

const locationIds = Object.keys(fastingTimes.locations);
const londonId = locationIds[0];

// TODO: this needs to be cleaned up
// ----------------------------------
// Sorted in alphabetical order but with London first
export const sortedLocationIds = [
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

export const getDisplayText = id => {
  const location = fastingTimes.locations[id];
  const region = fastingTimes.regions[location.region];
  return `${location.name}, ${region.code}`;
};
