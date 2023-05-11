import User from "../models/User.model.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

export const deleteFilesUploaded = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user === null) {
        throw Error(`User with ID : ${req.params.id} not found`);
      } else {
        const fileName = "custom-avatar-" + req.params.id;
        cloudinary.api
          .delete_resources([req.params.id + "/" + fileName])
          .then((result) => {
            console.log(result);
            user.picture = "https://i.ibb.co/YBHsp5k/default-avatar.png";
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
