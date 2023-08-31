const mongoose = require("mongoose");

const  postSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    nickName: {
      type: String,
    },
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comments",
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

module.exports = mongoose.model("Post", postSchema);
