import path from "path";
import User from "../models/User.model.js";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filesFolder = `${__dirname}/../client/public/images/avatars/`;
const filesBuildFolder = `${__dirname}/../client/build/images/avatars/`;

export const deleteFilesUploaded = (req, res, next) => {
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

  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user === null) {
        throw Error(`User with ID : ${req.params.id} not found`);
      } else {
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
        user.picture = "https://i.ibb.co/rxjCqSn/default-avatar.png";
        user
          .save()
          .then((userUpdated) => {
            res.status(201).json({
              picture: userUpdated.picture,
              status: 201,
              message: `Custom avatar files for user ${req.params.id} has been successfully deleted`,
            });
          })
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
};
