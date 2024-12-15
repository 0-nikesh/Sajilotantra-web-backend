const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require("../controller/UserController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// General user actions
router.post("/register", registerUser); // User registration
router.post("/login", loginUser);       // User login

// Admin-only actions (e.g., get all users, delete users)
router.get("/", protect, getAllUsers);       // Get all users (protected)
router.get("/:id", protect, getUserById);   // Get a user by ID (protected)
router.delete("/:id", protect, deleteUser); // Delete a user (protected)

module.exports = router;
