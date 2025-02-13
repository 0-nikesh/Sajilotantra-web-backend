const mongoose = require("mongoose");

const GovernmentProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String },
  description: { type: String, required: true },
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  branches: [
    {
      name: { type: String, required: true },
      address: { type: String },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    }
  ],
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const GovernmentProfile = mongoose.model("GovernmentProfile", GovernmentProfileSchema);
module.exports = GovernmentProfile;
