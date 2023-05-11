export const avatarErrors = (error) => {
  let errorMessage = error.code;
  if (error.errors !== undefined) {
    if (error.message.includes("level")) {
      errorMessage = error.errors.level.message;
    }
    if (error.message.includes("url")) {
      errorMessage = error.errors.url.message;
    }
    if (error.message.includes("name")) {
      errorMessage = error.errors.url.message;
    }
  } else {
    if (error.code === 11000) {
      const element = Object.keys(error.keyValue)[0];
      errorMessage = `Avatar data already exists for this ${element}`;
    }
  }
  return errorMessage;
};
