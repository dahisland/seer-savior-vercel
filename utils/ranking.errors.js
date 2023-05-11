export const rankingErrors = (error) => {
  let errorMessage = error.code;
  if (error.errors !== undefined) {
    if (error.message.includes("level")) {
      errorMessage = error.errors.level.message;
    }
    if (error.message.includes("score")) {
      errorMessage = error.errors.score.message;
    }
    if (error.message.includes("userId")) {
      errorMessage = error.errors.userId.message;
    }
    if (error.message.includes("userPseudo")) {
      errorMessage = error.errors.userPseudo.message;
    }
  } else {
    if (error.code === 11000) {
      const element = Object.keys(error.keyValue)[0];
      errorMessage = `${
        element.charAt(0).toUpperCase() + element.slice(1)
      } ranking data already exists`;
    }
  }
  return errorMessage;
};
