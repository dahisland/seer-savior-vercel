import {
  formatIntuitionSubmitLevel1,
  formatIntuitionSubmitLevel2,
  formatIntuitionSubmitLevel3,
} from "./formatOnSubmit.functions";

// --------------------------- //
// EXPORT INPUTS EVENTS SUBMIT
// --------------------------- //

export function formatIntuitionSubmitByLevel(e, level) {
  switch (level) {
    case 1:
      return formatIntuitionSubmitLevel1(e, level);
    case 2:
      return formatIntuitionSubmitLevel2(e, level);
    case 3:
      return formatIntuitionSubmitLevel3(e, level);
    default:
      return formatIntuitionSubmitLevel1(e, level);
  }
}
