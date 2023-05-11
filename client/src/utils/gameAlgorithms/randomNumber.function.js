// ----------------------- //
// RANDOM NUMBER FUNCTIONS
// ----------------------- //

// Algorithm to generate a random number
export function generateRandomNumber(scale, round) {
  let nbr = Math.round(Math.random() * scale * 100) / 100;
  let result;
  if (String(nbr).includes(".")) {
    let int = parseInt(String(nbr).split(".")[0]);
    let decimal = Math.round((nbr - int) * 100);
    result = int + "." + parseInt(decimal / round) * round;
  } else {
    result = nbr;
  }
  return parseFloat(result);
}
