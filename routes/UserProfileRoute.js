const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controller/UserProfileController");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Route to get the authenticated user's profile
router.get("/profile", protect, getUserProfile);

// Route to update the authenticated user's profile
router.put("/profile", protect, updateUserProfile);

module.exports = router;
