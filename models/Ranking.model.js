import mongoose from "mongoose";

// Level must be unique
const rankingSchema = mongoose.Schema(
  {
    level: {
      type: Number,
      unique: true,
      required: [true, "level is required"],
    },
    score: { type: Number, required: [true, "score is required"] },
    userId: { type: String, required: [true, "userId is required"] },
    userPseudo: { type: String, required: [true, "userPseudo is required"] },
  },
  { timestamps: true }
);

const rankingModel = mongoose.model("Ranking", rankingSchema);

export default rankingModel;
