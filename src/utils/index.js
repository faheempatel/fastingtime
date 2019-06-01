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
    ((targetUpperBound - targetLowerBound) * (value - currentLowerBound)) /
      (currentUpperBound - currentLowerBound)
  );
}

export function differenceInMinutes(laterDate, earlierDate) {
  if (!(laterDate instanceof Date)) {
    laterDate = new Date(laterDate);
  }

  if (!(earlierDate instanceof Date)) {
    earlierDate = new Date(earlierDate);
  }

  const diffInMs = laterDate - earlierDate;
  const diffInMins = diffInMs / 60000;

  return diffInMins;
}

// TODO: Refactor
export function convertMinsToHrsMins(mins) {
  if (mins < 0) throw new RangeError('The argument must be above 0.');

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

  return { hours: h, minutes: m };
}

function isAfter(firstDate, secondDate) {
  if (!(firstDate instanceof Date)) {
    firstDate = new Date(firstDate);
  }

  if (!(secondDate instanceof Date)) {
    secondDate = new Date(secondDate);
  }

  const diffInMs = new Date(firstDate) - new Date(secondDate);
  const difference = diffInMs / 60000;

  return difference >= 0;
}

export const fastHasStarted = isAfter;
export const fastHasEnded = isAfter;
