// import express from 'express'; // Change 'require' to 'import'
// import {
//   deleteUser,
//   getAllUsers,
//   getProfile,
//   getUserById,
//   loginUser,
//   registerUser,
//   requestPasswordReset,
//   resetPassword,
//   verifyOtp
// } from '../controller/UserController.js'; // Change 'require' to 'import'
// import { admin, protect } from '../middleware/authMiddleware.js'; // Change 'require' to 'import'

// const router = express.Router();

// router.post("/verify-otp", verifyOtp); // OTP verification route
// // General user actions
// router.post("/register", registerUser);  // User registration
// router.post("/login", loginUser);        // User login

// // Admin-only actions (e.g., get all users, delete users)
// router.get("/all", protect, admin, getAllUsers);      // Get all users (protected)
// router.get("/:id", protect, admin, getUserById);      // Get a user by ID (protected)
// router.delete("/:id", protect, admin, deleteUser);    // Delete a user (protected)
// router.get("/profile", protect, getProfile);

// router.post("/request-password-reset", requestPasswordReset);
// router.post("/reset-password", resetPassword);

// export default router;  // Change 'module.exports' to 'export default'

import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getProfile,
  getUserById,
  loginUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
  updateUserProfile,
  verifyOtp,
} from '../controller/UserController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);

router.get("/all", protect, admin, getAllUsers);
router.get("/:id", protect, admin, getUserById);
router.delete("/:id", protect, admin, deleteUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateUserProfile);

router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;
