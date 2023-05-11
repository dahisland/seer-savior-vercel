import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

// Control for all routes token in cookies
export const controlUserToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET_KEY,
        async (err, decodedToken) => {
          if (err) {
            res.locals.user = null;
            res.cookie("jwt", "", { maxAge: 1 });
            next();
          } else {
            let user = await User.findById(decodedToken.userId);
            res.locals.user = user;
            next();
          }
        }
      );
    } else {
      res.locals.user = null;
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

// get user connexion status by consulting if he has token
export const statusUserToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET_KEY,
        async (err, decodedToken) => {
          if (err) {
            console.log(err);
            res
              .status(400)
              .json({ status: 400, error: err.message ? err.message : err });
          } else {
            res.status(200).json({
              status: 200,
              message: "User is connected",
              token: true,
              userId: decodedToken.userId,
            });
            next();
          }
        }
      );
    } else {
      res
        .status(200)
        .json({ status: 200, token: false, message: "User not connected" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, error: err.message ? err.message : err });
  }
};

// Authorize some requests only for user/admin connected
export const requireToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET_KEY,
        async (err, decodedToken) => {
          if (err) {
            console.log(err);
            res
              .status(400)
              .json({ status: 400, error: err.message ? err.message : err });
          } else {
            console.log(decodedToken.userId);
            next();
          }
        }
      );
    } else {
      throw Error("Token required");
    }
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, error: err.message ? err.message : err });
  }
};

// Authorize some requests only if user connected id = request id or if admin connected
export const requireUserTokenOrAdmin = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET_KEY,
        async (err, decodedToken) => {
          if (err) {
            console.log(err);
            res
              .status(400)
              .json({ status: 400, error: err.message ? err.message : err });
          } else {
            if (
              decodedToken.userId !== req.params.id &&
              decodedToken.admin === false
            ) {
              res.status(401).json({
                status: 401,
                error:
                  "Authorization refused. User not allowed to send this request.",
              });
            } else {
              console.log(decodedToken.userId);
              next();
            }
          }
        }
      );
    } else {
      throw Error("Token required");
    }
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, error: err.message ? err.message : err });
  }
};

// Authorize some requests only for admin connected
export const requireAdminToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET_KEY,
        async (err, decodedToken) => {
          if (err) {
            console.log(err);
            res
              .status(400)
              .json({ status: 400, error: err.message ? err.message : err });
          } else {
            User.findOne({ _id: decodedToken.userId })
              .then((user) => {
                decodedToken.admin
                  ? next()
                  : res.status(401).json({
                      status: 401,
                      error: "Admin privileges required",
                    });
              })
              .catch((err) => {
                res.status(400).json({
                  status: 400,
                  error: err.message ? err.message : err,
                });
              });
          }
        }
      );
    } else {
      throw Error("Token required");
    }
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, error: err.message ? err.message : err });
  }
};

// Authorize some requests only for user connected
export const requireNotConnected = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      throw Error("Request needs to not being connected");
    } else {
      console.log("User not connected");
      next();
    }
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, error: err.message ? err.message : err });
  }
};
