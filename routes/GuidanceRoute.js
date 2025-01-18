import { admin, protect } from "../middleware/authMiddleware.js";
import express from ("express");
import {
    createGuidance,
    getAllGuidances,
    getGuidanceById,
    updateGuidance,
} from ("../controller/GuidanceController.js");
const router = express.Router();

router.post("/post", protect, admin, createGuidance);

router.get("/getall", protect, getAllGuidances);

router.get("/:id", getGuidanceById);

router.put("/:id", protect, admin, updateGuidance);

export default router;