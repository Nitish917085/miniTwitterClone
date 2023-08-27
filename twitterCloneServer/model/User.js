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
    blogs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Blog",
      },
    ],
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
