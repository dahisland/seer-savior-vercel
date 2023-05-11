import { createServer } from "http";
import { serverErrors } from "./utils/server.errors.js";
import dotenv from "dotenv";
import app from "./app.js";

// Configure path for process.env file config
dotenv.config({ path: "./config/.env" });

// Normalize port
const normalizePort = (value) => {
  const port = parseInt(value, 10);

  if (isNaN(port)) {
    return value;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT) || 3001;

// Create server
const server = createServer(app);

// Server address
const address = server.address();

// Indicate the port used to the Express module
app.set("port", port);

// Process
server.on("error", (error) => serverErrors(error, address));
server.on("listening", () => {
  const addressTypeof =
    typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + addressTypeof);
});

// Listen the request which will be sent to server by a port.
server.listen(port);
