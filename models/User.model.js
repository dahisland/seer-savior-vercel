import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      maxlength: [55, "Email can't exceed 55 characters"],
      lowercase: true,
      validate: [isEmail, "Wrong email format"],
      trim: true,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Password requires min 6 characters"],
      maxlength: [1024, "Password can't exceed 1024 characters"],
      trim: true,
      required: [true, "Password is required"],
    },
    pseudo: {
      type: String,
      minlength: [6, "Pseudo requires min 6 characters"],
      maxlength: [20, "Pseudo can't exceed 25 characters"],
      trim: true,
      required: [true, "Pseudo is required"],
      unique: true,
    },
    admin: { type: Boolean, default: false },
    picture: {
      type: String,
      default: "https://i.ibb.co/YBHsp5k/default-avatar.png",
    },
    scores: { type: [Object] },
  },
  { timestamps: true }
);

// This function is played before a user.save() to hash password before registration in database
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } else {
    next();
  }
});

// This function is called during login request to decrypt an hash password and compare to req.body.password
userSchema.statics.login = async function (pseudo, password) {
  const user = await this.findOne({ pseudo });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error("Incorrect password");
    }
  } else {
    throw Error("Incorrect pseudo");
  }
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
