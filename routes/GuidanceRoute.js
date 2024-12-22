const express = require("express");
const {
    createGuidance,
    getAllGuidances,
    getGuidanceById,
    updateGuidance,
} = require("../controller/GuidanceController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/post", protect, admin, createGuidance);

router.get("/getall", protect, getAllGuidances);

router.get("/:id", getGuidanceById);

router.put("/:id", protect, admin, updateGuidance);

module.exports = router;
