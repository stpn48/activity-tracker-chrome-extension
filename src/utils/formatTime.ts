export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours ? `${hours}h` : ""} ${minutes ? `${minutes}m` : ""} ${remainingSeconds}s`;
}
