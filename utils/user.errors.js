export const signupErrors = (error) => {
  let errorMessage = error.code;
  if (error.errors !== undefined) {
    if (error.message.includes("email")) {
      errorMessage = error.errors.email.message;
    }
    if (error.message.includes("password")) {
      errorMessage = error.errors.password.message;
    }
    if (error.message.includes("pseudo")) {
      errorMessage = error.errors.pseudo.message;
    }
  } else {
    if (error.code === 11000) {
      const element = Object.keys(error.keyValue)[0];
      errorMessage = `${
        element.charAt(0).toUpperCase() + element.slice(1)
      } already exists`;
    }
  }
  return errorMessage;
};

export const loginErrors = (error) => {
  let errorMessage = error;
  if (error.message !== undefined) {
    if (error.message.includes("pseudo")) {
      errorMessage = "Your identifiant is unknown or invalid";
    }
    if (error.message.includes("password")) {
      errorMessage = "Your password is invalid";
    }
  }

  return errorMessage;
};
