const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },   
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", commentSchema);
