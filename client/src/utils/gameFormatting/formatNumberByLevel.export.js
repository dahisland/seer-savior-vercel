import {
  formatNumberLevel1,
  formatNumberLevel2,
  formatNumberLevel3,
} from "./formatNumber.functions";

// ---------------------------- //
// FORMAT FUNCTION SWITCH LEVELS
// ---------------------------- //

export function formatNumberByLevel(level, nbr) {
  let numberFormatted;
  switch (level) {
    case 1:
      numberFormatted = formatNumberLevel1(nbr);
      break;
    case 2:
      numberFormatted = formatNumberLevel2(nbr);
      break;
    case 3:
      numberFormatted = formatNumberLevel3(nbr);
      break;
    default:
      numberFormatted = formatNumberLevel1(nbr);
  }
  return numberFormatted;
}
