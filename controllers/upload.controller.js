import User from "../models/User.model.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

dotenv.config({ path: "./config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

export const uploadUserPicture = async (req, res) => {
  if (req.file === undefined) {
    return res.status(400).json({
      status: 400,
      error: `Missing file to upload`,
    });
  } else {
    const fileName = "custom-avatar-" + req.params.id;
    const stream = await cloudinary.uploader.upload_stream(
      {
        public_id: fileName,
        folder: req.params.id,
        resource_type: "auto",
        overwrite: true,
      },
      (error, result) => {
        if (error) return console.error(error);
        User.findByIdAndUpdate(
          req.params.id,
          { $set: { picture: result.secure_url } },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        )
          .then((data) =>
            res.status(201).json({
              picture: data.picture,
              status: 201,
              message:
                "User avatar picture has been successfully uploaded and updated",
            })
          )
          .catch((err) => {
            res
              .status(500)
              .json({ status: 500, error: err.message ? err.message : err });
          });
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  }
};
export const config = {
  api: {
    bodyParser: false,
  },
};
