export function convertToAMPM(hour: number) {
  const isAM = hour < 12; // Determine if it's AM or PM
  const formattedHour = hour % 12 || 12; // Convert to 12-hour format (0 becomes 12)
  const period = isAM ? "AM" : "PM"; // Determine AM/PM

  return `${formattedHour}${period}`; // Return the formatted hour
}
