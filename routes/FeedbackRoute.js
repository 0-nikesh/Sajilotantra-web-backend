const express = require("express");
const { submitFeedback, getAllFeedback } = require("../controller/FeedbackController");

const router = express.Router();

router.post("/", submitFeedback);
router.get("/getall", getAllFeedback)

module.exports = router;
