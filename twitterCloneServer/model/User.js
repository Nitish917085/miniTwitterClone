const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
    },
    nickName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    posts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
      },
    ],
    followers: [{ type: String }],
    following: [{ type: String }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
