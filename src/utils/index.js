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

// TODO: Refactor
export function convertMinsToHrsMins(mins) {
  let h = Math.floor(mins / 60);
  let m = mins % 60;

  // Edge cases
  if (m > 59) {
    // Display 1:00 not 0:60, 15:00 not 15:60, etc
    h = h + 1;
    m = 0;
  } else {
    // Ceil so it shows 0:01 when it still needs to (as opposed to 0:00)
    m = Math.ceil(mins % 60);
  }

  // Prepend 0 when needed
  m = m < 10 ? '0' + m : m;

  return { hours: h, minutes: m };
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
