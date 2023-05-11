export const multerErrors = (error, req) => {
  let errorMessage = error.code;
  if (error.code.includes("Wrong format")) {
    errorMessage = "Only formats files jpeg, jpg or png are accepted";
  }
  if (error.code.includes("LIMIT_FILE_SIZE")) {
    errorMessage = "File size can't exceed 500Ko";
  }

  return errorMessage;
};
