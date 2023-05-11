import mongoose from "mongoose";

const ObjectID = mongoose.Types.ObjectId;

// Middleware used for each request using req.params.id
// Verify is id has a valid ObjectID format
export const requireValidObjectID = (req, res, next) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      throw Error(`ObjectID is not valid`);
    } else {
      console.log("ObjectID is valid");
      next();
    }
  } catch (err) {
    res
      .status(400)
      .json({ status: 400, error: err.message ? err.message : err });
  }
};
