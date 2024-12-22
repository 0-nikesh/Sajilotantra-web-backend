const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser,
  getProfile,
} = require("../controller/UserController");

const router = express.Router();

// General user actions
router.post("/register", registerUser); // User registration
router.post("/login", loginUser);       // User login

// Admin-only actions (e.g., get all users, delete users)
router.get("/all", protect, admin, getAllUsers);       // Get all users (protected)
router.get("/:id", protect, admin, getUserById);   // Get a user by ID (protected)
router.delete("/:id", protect, admin, deleteUser); // Delete a user (protected)
router.get("/profile", protect, getProfile);

module.exports = router;
