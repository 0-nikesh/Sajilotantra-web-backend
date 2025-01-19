import mongoose from "mongoose";

const GovernmentProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  thumbnail: {
    type: String, // Path to the uploaded image file or URL
    required: false,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

GovernmentProfileSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const GovernmentProfile = mongoose.model("GovernmentProfile", GovernmentProfileSchema);
export default GovernmentProfile;
