import { gameLevelsData } from "../../data/game/gameLevelsData";
import { generateRandomNumber } from "./randomNumber.function";
import { formatNumberByLevel } from "../gameFormatting/formatNumberByLevel.export";

// ------------------------------- //
// EXPORT GET RANDOM NUMBER BY LEVEL
// ------------------------------- //

// Generate object with random number and number formatted for each level
export function getNumberToFind(level) {
  const levelsDataAlgo = gameLevelsData.filter(
    (item) => item.level === level
  )[0].algo;

  let randomNumber = generateRandomNumber(levelsDataAlgo[0], levelsDataAlgo[1]);
  let formattedRandomNbr = formatNumberByLevel(level, randomNumber);

  return { number: randomNumber, display: formattedRandomNbr };
}

export function getIntuitions(level, nbrTested) {
  const levelsDataAlgo = gameLevelsData.filter(
    (item) => item.level === level
  )[0].algo;
  let randomNumber1 = generateRandomNumber(
    levelsDataAlgo[0],
    levelsDataAlgo[1]
  );
  let randomNumber2 = generateRandomNumber(
    levelsDataAlgo[0],
    levelsDataAlgo[1]
  );
  // Avoid intuitions repetitions or intuitions already suggested
  while (
    randomNumber1 === randomNumber2 ||
    nbrTested.includes(randomNumber1) ||
    nbrTested.includes(randomNumber2)
  ) {
    randomNumber1 = generateRandomNumber(levelsDataAlgo[0], levelsDataAlgo[1]);
    randomNumber2 = generateRandomNumber(levelsDataAlgo[0], levelsDataAlgo[1]);
  }

  const formatRandomNbr1 = formatNumberByLevel(level, randomNumber1);
  const formatRandomNbr2 = formatNumberByLevel(level, randomNumber2);
  return [
    { number: randomNumber1, display: formatRandomNbr1 },
    { number: randomNumber2, display: formatRandomNbr2 },
  ];
}
