import express from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controller/UserProfileController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Route to get the authenticated user's profile
router.get("/profile", protect, getUserProfile);

// Route to update the authenticated user's profile (with file upload)
router.put(
  "/profile",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  updateUserProfile
);

export default router;
