import express from "express";
import multer from "multer"; // For file uploads
import {
    createGovernmentProfile,
    deleteGovernmentProfile,
    getAllGovernmentProfiles,
    getGovernmentProfileById,
    updateGovernmentProfile,
} from "../controller/GovernmentController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" }); // Temporary storage in `uploads/`

const router = express.Router();

// Admin-only routes for government profiles
router.post("/", protect, admin, upload.single("thumbnail"), createGovernmentProfile); // Create a new profile
router.get("/", protect, admin, getAllGovernmentProfiles); // Get all profiles
router.get("/:id", protect, admin, getGovernmentProfileById); // Get a single profile by ID
router.put("/:id", protect, admin, upload.single("thumbnail"), updateGovernmentProfile); // Update a profile
router.delete("/:id", protect, admin, deleteGovernmentProfile); // Delete a profile

export default router;
