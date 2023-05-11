import { months } from "../gameValues";
// ------------------ //
// FORMATS FUNCTIONS
// ------------------ //

// Format number to month string (for level 1)
export function formatNumberLevel1(number) {
  return months[number].charAt(0).toUpperCase() + months[number].substr(1);
}

// Format number to hour (for level 2)
export function formatNumberLevel2(number) {
  const floor = number + 1;
  return "Floor " + floor;
}

// Format number to hour (for level 3)
export function formatNumberLevel3(number) {
  let hour = String(number).includes(".")
    ? parseInt(String(number).split(".")[0])
    : number;
  let minute = Math.round((number - hour) * 100);
  let minutePercent = parseInt((minute * 60) / 100);
  let hourToDisplay = hour < 10 ? "0" + hour : hour;
  let minuteToDisplay =
    minutePercent < 10 ? "0" + minutePercent : minutePercent;
  return hourToDisplay + "H" + minuteToDisplay;
}
