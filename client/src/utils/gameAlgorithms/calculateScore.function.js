import { bonusScore } from "../gameValues";

export function calculateScore(levelData, numbersTestedLength) {
  const maxClickLevel = levelData.algo[0] / (levelData.algo[1] / 100);
  const nbrClicksUser = numbersTestedLength;
  let totalScore = parseInt(maxClickLevel - nbrClicksUser);
  if (nbrClicksUser <= 1) {
    totalScore += bonusScore;
  }
  return totalScore;
}
