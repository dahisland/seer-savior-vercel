export const serverErrors = (error, address) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const addressTypeof =
    typeof address === "string" ? "pipe " + address : "port: " + port;

  switch (error.code) {
    case "EACCES":
      console.error(addressTypeof + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(addressTypeof + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};
