
export const timeFormatter = (timeToFormat) => {
  if (timeToFormat < 0) {
    return "00:00";
  }
  let minutes = Math.floor(timeToFormat / 60).toString();
  let seconds = (timeToFormat % 60).toString();
  minutes = minutes.length == 1 ? `0${minutes}` : minutes;
  seconds = seconds.length == 1 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
};