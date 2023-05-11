import User from "../models/User.model.js";

export const uploadUserPicture = (req, res) => {
  if (req.file === undefined) {
    return res.status(400).json({
      status: 400,
      error: `Missing file to upload`,
    });
  } else {
    const fileName =
      "custom-avatar-" + req.params.id + "." + req.file.mimetype.split("/")[1];
    User.findByIdAndUpdate(
      req.params.id,
      { $set: { picture: "./images/avatars/" + fileName } },
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
};
