// const mongoose = require("mongoose");

// const GuidanceSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   thumbnail: String,
//   category: String,
//   documents_required: String,
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// });

// module.exports = mongoose.model("Guidance", GuidanceSchema);

const mongoose = require("mongoose");

const GuidanceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true }, // URL or path to the thumbnail image
  category: { type: String, required: true }, // For organizing guidance by type
  documents_required: [{ type: String }], // Array of document names
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Refers to the user/admin who created it
  createdAt: { type: Date, default: Date.now } // Optional: track when the guidance was added
});

module.exports = mongoose.model("Guidance", GuidanceSchema);
