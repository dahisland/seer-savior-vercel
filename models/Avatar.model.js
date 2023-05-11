import mongoose from "mongoose";

// Level must be unique (only one avatar by level)
const avatarSchema = mongoose.Schema(
  {
    level: {
      type: Number,
      unique: true,
      required: [true, "level is required"],
    },
    url: { type: String, required: [true, "url is required"] },
    name: { type: String, required: [true, "name is required"] },
  },
  { timestamps: true }
);

const avatarModel = mongoose.model("Avatar", avatarSchema);

export default avatarModel;
