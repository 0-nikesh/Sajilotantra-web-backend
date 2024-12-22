const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  Category: Number,
  suggestion: Number,
  file: String,
  feedback: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});


module.exports = mongoose.model("Feedback", FeedbackSchema);
