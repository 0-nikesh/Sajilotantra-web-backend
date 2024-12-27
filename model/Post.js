const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  caption: String,
  category: String,
  image: String,
  created_at: { type: Date, default: Date.now },
  like_count: { type: Number, default: 0 },
  comment: { type: Number, default: 0 },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  liked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Track users who liked the post
});

module.exports = mongoose.model("Post", PostSchema);
