const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersRegister = new Schema(
  {
    username: {
      type: String,
      unique: true,
      reuired: [true, "Username is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Rquired"],
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      minlength: [6, "password must be at least 6 characters"],
      required: [true, "Password is Required"],
    },
  },
  { timestamps: true }
);
const USERS = mongoose.model("users", usersRegister);
module.exports = USERS;
