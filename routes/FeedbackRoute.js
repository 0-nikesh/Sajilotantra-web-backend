const express = require("express");
const { submitFeedback, getAllFeedback } = require("../controller/FeedbackController");
const { admin, protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, submitFeedback);
router.get("/getall", protect, admin, getAllFeedback)

module.exports = router;
