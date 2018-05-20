// Re-maps a number from one range to another
// Works like Processing's map() function
export function mapRange({
  value,
  currentLowerBound,
  currentUpperBound,
  targetLowerBound,
  targetUpperBound
}) {
  return (
    targetLowerBound +
    (targetUpperBound - targetLowerBound) *
      (value - currentLowerBound) /
      (currentUpperBound - currentLowerBound)
  );
}

export function differenceInMinutes(endTime, startTime) {
  if (!(endTime instanceof Date)) {
    endTime = new Date(endTime);
  }

  if (!(startTime instanceof Date)) {
    startTime = new Date(startTime);
  }

  const diffInMs = endTime - startTime;
  const diffInMins = diffInMs / 60000;

  return diffInMins;
}

export function convertMinsToHrsMins(mins) {
  const h = Math.floor(mins / 60);
  let m = mins > 59 ? 59 : Math.ceil(mins % 60);
  m = m < 10 ? '0' + m : m;
  return `${h}:${m}`;
}

export function fastHasStarted(currentDateAndTime, startTime) {
  if (!(currentDateAndTime instanceof Date)) {
    currentDateAndTime = new Date(currentDateAndTime);
  }

  if (!(startTime instanceof Date)) {
    startTime = new Date(startTime);
  }

  const difference = new Date(currentDateAndTime) - new Date(startTime);
  return difference >= 0;
}

export function fastHasEnded(currentDateAndTime, endTime) {
  if (!(currentDateAndTime instanceof Date)) {
    currentDateAndTime = new Date(currentDateAndTime);
  }

  if (!(endTime instanceof Date)) {
    endTime = new Date(endTime);
  }

  const diffInMs = new Date(currentDateAndTime) - new Date(endTime);

  const difference = diffInMs / 60000;
  return difference >= -0;
}
