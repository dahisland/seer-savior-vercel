import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/user.routes.js";
import rankingRoutes from "./routes/ranking.routes.js";
import avatarRoutes from "./routes/avatar.routes.js";
import {
  controlUserToken,
  statusUserToken,
} from "./middleware/auth.middleware.js";
import cors from "cors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configure path for process.env file config
dotenv.config({ path: "./config/.env" });

// Implement connection to MongoDB database
mongoose
  .set("strictQuery", false)
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.vrouqi7.mongodb.net/seer-savior",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB !"))
  .catch((err) => console.log("Connexion to MongoDB failed !", err));

// Declare Express module app
const app = express();

// Configuration for cors policy
const corsOptions = {
  origin: process.env.CLIENT_URL !== undefined ? process.env.CLIENT_URL : "*",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

// Intercept all requests to apply cors configuration before all requests
app.use(cors(corsOptions));

// Intercept all requests : Express will consider and parse all requests with content-type : application/json
// to provide their body in the req object.
app.use(express.json());
// Intercept all requests : Express will parse cookies to provide them in the req object
app.use(cookieParser());
// TEST - Connect to front
app.use(express.static(path.join(process.cwd(), "client", "build")));

// Apply a middleware to have a constant control of token status
app.get("*", controlUserToken);
// Define a route GET request to return status token
app.get("/api/jwtid", statusUserToken);

// Router collections
app.use("/api/user", userRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/avatar", avatarRoutes);

// TEST - path to the index.html client
app.get("*", (_, res) => {
  res.sendFile(path.join(process.cwd(), "client", "build", "index.html"));
});

export default app;
