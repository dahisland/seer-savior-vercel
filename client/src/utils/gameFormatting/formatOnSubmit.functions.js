import { formatNumberByLevel } from "./formatNumberByLevel.export";
import { months } from "../gameValues";

// ------------------------ //
// INPUT EVENTS SUBMIT
// ------------------------ //

export function formatIntuitionSubmitLevel1(e, level) {
  const value = e.target[0].value;
  let number = months.indexOf(value.toLowerCase().trim());
  if (number !== -1) {
    return {
      number: number,
      display: formatNumberByLevel(level, number),
    };
  } else {
    return null;
  }
}

export function formatIntuitionSubmitLevel2(e, level) {
  const floor = parseInt(e.target[0].value - 1);

  if (isNaN(floor)) {
    return null;
  } else {
    return {
      number: floor,
      display: formatNumberByLevel(level, floor),
    };
  }
}

export function formatIntuitionSubmitLevel3(e, level) {
  const hour = parseFloat(e.target[0].value);
  let minutes = parseInt(e.target[1].value);
  if (isNaN(minutes)) {
    minutes = 0;
  }
  let number = minutes === 30 ? hour + 0.5 : hour;

  if (isNaN(hour)) {
    return null;
  } else {
    return {
      number: number,
      display: formatNumberByLevel(level, number),
    };
  }
}
