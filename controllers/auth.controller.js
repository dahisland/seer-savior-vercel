import User from "../models/User.model.js";
import { signupErrors, loginErrors } from "../utils/user.errors.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../config/.env" });

const expirationToken = 24 * 60 * 60 * 1000;
// Generate a token by using jwt.sign()
const generateToken = (id, admin) => {
  // 1st param : data to encode (payload). Use the id will guarantee uniqueness for the token
  // 2nd param : secret key (to define in config env)
  // 3rd param : expiration delay
  return jwt.sign({ userId: id, admin: admin }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: expirationToken,
  });
};

// SIGNUP REQUEST
export const userSignup = (req, res, next) => {
  const { email, password, pseudo, admin } = req.body;
  const user = new User({
    email: email,
    password: password,
    pseudo: pseudo,
    admin: admin,
  });

  user
    .save()
    .then((user) => {
      res.status(201).json({
        userId: user._id,
        status: 201,
        message: "New user has been registered",
      });
    })
    .catch((error) =>
      res.status(400).send({
        status: 400,
        error: signupErrors(error),
      })
    );
};

// LOGIN REQUEST
export const userLogin = (req, res, next) => {
  const { pseudo, password } = req.body;

  User.login(pseudo, password)
    .then((user) => {
      const token = generateToken(user._id, user.admin);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: expirationToken,
      });
      res.status(200).json({
        userId: user._id,
        pseudo: user.pseudo,
        status: 200,
        message: "Connexion success",
      });
    })
    .catch((error) =>
      res.status(401).json({ status: 401, error: loginErrors(error) })
    );
};

// LOGOUT REQUEST
export const userLogout = (req, res, next) => {
  res
    .cookie("jwt", "", { maxAge: 1 })
    .status(200)
    .json({ status: 200, message: "User successfully logged out" })
    .redirect("/");
};
