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

export function convertMinsToHrsMins(mins) {
  const h = Math.floor(mins / 60);
  let m = mins % 60;
  m = m < 10 ? '0' + m : m;
  return `${h}:${m}`;
}
