import Avatar from "../models/Avatar.model.js";
import { avatarErrors } from "../utils/avatar.errors.js";

// CREATE NEW AVATAR DATA
export const createAvatar = (req, res, next) => {
  const { level, url, name } = req.body;
  if (level === undefined || url === undefined || name === undefined) {
    res.status(400).send({
      status: 400,
      error: "Request requires body level, url and name data",
    });
  } else {
    const avatar = new Avatar({
      level: parseInt(level),
      url: url,
      name: name,
    });

    avatar
      .save()
      .then((avatar) => {
        res.status(201).json({
          avatarId: avatar._id,
          status: 201,
          message: `New avatar for level ${level} has been registered`,
        });
      })
      .catch((error) =>
        res.status(400).send({
          status: 400,
          error: avatarErrors(error),
        })
      );
  }
};

// GET ALL AVATARS
export const getAllAvatars = (req, res, next) => {
  Avatar.find()
    .select("-createdAt -updatedAt -__v")
    .then((avatars) =>
      res.status(200).json({
        data: avatars.sort((a, b) => a.level - b.level),
        status: 200,
        message: "Get all avatars request success",
      })
    )
    .catch((err) =>
      res
        .status(500)
        .json({ status: 500, error: err.message ? err.message : err })
    );
};

// GET ONE AVATAR
export const getOneAvatar = (req, res, next) => {
  Avatar.findOne({ _id: req.params.id })
    .then((avatar) => {
      if (avatar === null) {
        throw Error(`Avatar with ID : ${req.params.id} not found`);
      } else {
        res.status(200).json({
          data: avatar,
          status: 200,
          message: `Get avatar with id ${req.params.id} request success`,
        });
      }
    })
    .catch((err) =>
      res
        .status(400)
        .json({ status: 400, error: err.message ? err.message : err })
    );
};

// FILTER AVATARS BY USER LEVEL (send response data null if filter return no match)
export const filterAvatarsByLevel = (req, res, next) => {
  const { level } = req.body;

  if (level === undefined) {
    res.status(400).json({ status: 400, error: "Level data is required" });
  } else {
    Avatar.find()
      .select("-createdAt -updatedAt -__v")
      .then((avatars) => {
        const avatarsFiltered = avatars.filter(
          (item) => item.level <= parseInt(level)
        );
        res.status(200).json({
          data:
            avatarsFiltered.length === 0
              ? null
              : avatarsFiltered.sort((a, b) => a.level - b.level),
          status: 200,
          message: `Get avatars under or equals to level ${level} success`,
        });
      })
      .catch((err) =>
        res
          .status(500)
          .json({ status: 500, error: err.message ? err.message : err })
      );
  }
};

// UPDATE ONE AVATAR
export const updateAvatar = (req, res, next) => {
  const { level, url, name } = req.body;

  if (level === undefined && url === undefined && name === undefined) {
    // Data can be updated for level only, url only, or both
    return res.status(400).json({
      status: 400,
      error: `Body request requires level and/or url and/or name data`,
    });
  } else {
    Avatar.findOne({ _id: req.params.id })
      .then((avatar) => {
        if (avatar === null) {
          throw Error(`Avatar with id : ${req.params.id} not found`);
        } else {
          // Data can be updated for level only, url only, or both
          if (level !== undefined) {
            avatar.level = parseInt(level);
          }
          if (url !== undefined) {
            avatar.url = url;
          }
          if (name !== undefined) {
            avatar.name = name;
          }

          avatar
            .save()
            .then((avatarUpdated) =>
              res.status(200).json({
                data: avatarUpdated,
                status: 200,
                message: `Avatar with id : ${req.params.id} has been successfully updated`,
              })
            )
            .catch((error) =>
              res.status(400).json({ status: 400, error: avatarErrors(error) })
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

// DELETE ONE AVATAR
export const deleteAvatar = (req, res, next) => {
  Avatar.findOneAndDelete({ _id: req.params.id })
    .then((avatar) => {
      if (avatar === null) {
        throw Error(`Avatar with id : ${req.params.id} not found`);
      } else {
        res
          .status(200)
          .json({ status: 200, message: "Avatar successfully deleted" });
      }
    })
    .catch((err) =>
      res
        .status(400)
        .json({ status: 400, error: err.message ? err.message : err })
    );
};
