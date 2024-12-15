const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  image: String,
  cover: String,
  bio: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
