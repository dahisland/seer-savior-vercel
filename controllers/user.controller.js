import User from "../models/User.model.js";
import { signupErrors } from "../utils/user.errors.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filesFolder = `${__dirname}/../client/public/images/avatars/`;
const filesBuildFolder = `${__dirname}/../client/build/images/avatars/`;

// GET ALL USERS
export const getAllUsers = (req, res, next) => {
  User.find()
    .select("-password")
    .then((users) =>
      res.status(200).json({
        data: users,
        status: 200,
        message: "Get all users request success",
      })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ status: 500, error: err.message ? err.message : err })
    );
};

// GET ONE USER
export const getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .select("-password -admin")
    .then((user) => {
      if (user === null) {
        throw Error(`User with ID : ${req.params.id} not found`);
      } else {
        res.status(200).json({
          data: user,
          status: 200,
          message: "Get user data request success",
        });
      }
    })
    .catch((err) =>
      res
        .status(400)
        .json({ status: 400, error: err.message ? err.message : err })
    );
};

// UPDATE USER SCORES (by updating score for an existing level)
export const updateLevelScore = (req, res, next) => {
  const { level, score } = req.body;

  if (level === undefined || score === undefined) {
    return res.status(400).json({
      status: 400,
      error: `Body request requires level and score data`,
    });
  } else {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (user === null) {
          throw Error(`User with ID : ${req.params.id} not found`);
        } else {
          let dataToUpdate = user.scores.find((item) => item.level == level);
          if (dataToUpdate !== undefined) {
            if (dataToUpdate.score > score) {
              throw Error(
                `Score request for level ${level} must be greater than score already registered`
              );
            } else {
              dataToUpdate.score = parseInt(score);
              user
                .save()
                .then((userUpdated) =>
                  res.status(200).json({
                    scores: userUpdated.scores,
                    status: 200,
                    message: `User score for level ${level} has been successfully updated`,
                  })
                )
                .catch((err) =>
                  res.status(500).json({
                    status: 500,
                    error: err.message ? err.message : err,
                  })
                );
            }
          } else {
            throw Error(
              `Score data to update for level ${level} doesn't exists`
            );
          }
        }
      })
      .catch((err) =>
        res
          .status(400)
          .json({ status: 400, error: err.message ? err.message : err })
      );
  }
};

// UPDATE USER SCORES (by adding new score for new level)
export const addLevelScore = (req, res, next) => {
  const { level, score } = req.body;

  if (level === undefined || score === undefined) {
    return res.status(400).json({
      status: 400,
      error: `Body request requires level and score data.`,
    });
  } else {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (user === null) {
          throw Error(`User with ID : ${req.params.id} not found`);
        } else {
          const verifyData = user.scores.findIndex(
            (item) => item.level == level
          );
          if (verifyData === -1) {
            user.scores.push({
              level: parseInt(level),
              score: parseInt(score),
            });
            user
              .save()
              .then((userUpdated) =>
                res.status(200).json({
                  scores: userUpdated.scores,
                  status: 200,
                  message: `User scores have been successfully updated`,
                })
              )
              .catch((err) =>
                res
                  .status(500)
                  .json({ status: 500, error: err.message ? err.message : err })
              );
          } else {
            throw Error(`Data for level ${level} already exists`);
          }
        }
      })
      .catch((err) =>
        res
          .status(400)
          .json({ status: 400, error: err.message ? err.message : err })
      );
  }
};

// UPDATE USER EMAIL
export const updateUserEmail = (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(400).json({
      status: 400,
      error: `Body request needs email data`,
    });
  } else {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (user === null) {
          throw Error(`User with ID : ${req.params.id} not found`);
        } else {
          user.email = email;
          user
            .save()
            .then((userUpdated) => {
              res.status(200).json({
                userId: userUpdated._id,
                status: 200,
                message: `Email have been successfully updated.`,
              });
            })
            .catch((err) =>
              res.status(400).json({ status: 400, error: signupErrors(err) })
            );
        }
      })
      .catch((err) =>
        res
          .status(400)
          .json({ status: 400, error: err.message ? err.message : err })
      );
  }
};

// UPDATE USER LOGIN IDENTIFIANTS (pseudo and/or password)
export const updateUserLogins = (req, res, next) => {
  const { pseudo, password } = req.body;

  if (pseudo === undefined && password === undefined) {
    return res.status(400).json({
      status: 400,
      error: `Body request needs pseudo or password data`,
    });
  } else {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (user === null) {
          throw Error(`User with ID : ${req.params.id} not found`);
        } else {
          if (pseudo !== undefined) {
            user.pseudo = pseudo;
          }
          if (password !== undefined) {
            user.password = password;
          }
          user
            .save()
            .then((userUpdated) => {
              // Disconnect user by deleting token in cookies
              res.cookie("jwt", "", { maxAge: 1 }).status(200).json({
                userId: userUpdated._id,
                status: 200,
                message: `Login identifiants have been successfully updated. You have been disconnected`,
              });
            })
            .catch((err) =>
              res.status(500).json({ status: 500, error: signupErrors(err) })
            );
        }
      })
      .catch((err) =>
        res
          .status(400)
          .json({ status: 400, error: err.message ? err.message : err })
      );
  }
};

// UPDATE USER PICTURE
export const updateUserPicture = (req, res, next) => {
  const { picture } = req.body;

  if (picture === undefined) {
    return res.status(400).json({
      status: 400,
      error: `Body request requires picture data`,
    });
  } else {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (user === null) {
          throw Error(`User with ID : ${req.params.id} not found`);
        } else {
          user.picture = picture;

          user
            .save()
            .then((userUpdated) =>
              res.status(200).json({
                picture: userUpdated.picture,
                status: 200,
                message: `Picture for user ${req.params.id} has been successfully updated`,
              })
            )
            .catch((err) =>
              res
                .status(400)
                .json({ status: 400, error: err.message ? err.message : err })
            );
        }
      })
      .catch((err) =>
        res
          .status(400)
          .json({ status: 400, error: err.message ? err.message : err })
      );
  }
};

// DELETE USER
export const deleteUser = (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((user) => {
      if (user === null) {
        throw Error(`User with id : ${req.params.id} not found`);
      } else {
        const filesToDelete = [];
        const filesInFolder = fs.readdirSync(filesFolder);
        const filesInBuildFolder = fs.readdirSync(filesBuildFolder);

        filesInFolder.forEach((file) => {
          const fileName = path.parse(file).name;
          if (fileName === "custom-avatar-" + req.params.id) {
            filesToDelete.push(file);
          }
        });
        filesInBuildFolder.forEach((file) => {
          const fileName = path.parse(file).name;
          if (fileName === "custom-avatar-" + req.params.id) {
            filesToDelete.push(file);
          }
        });

        if (filesToDelete.length !== 0) {
          filesToDelete.forEach((file) => {
            fs.unlink(filesFolder + file, (err) => {
              if (err) console.log(err);
            });
            fs.unlink(filesBuildFolder + file, (err) => {
              if (err) console.log(err);
            });
          });
        }
        res
          .cookie("jwt", "", { maxAge: 1 })
          .status(200)
          .json({ status: 200, message: "User successfully deleted" });
      }
    })
    .catch((err) =>
      res
        .status(400)
        .json({ status: 400, error: err.message ? err.message : err })
    );
};
