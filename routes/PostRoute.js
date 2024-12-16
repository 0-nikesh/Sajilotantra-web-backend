const express = require("express");
const { createPost, getAllPosts, getPostById, deletePost } = require("../controller/PostController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.delete("/:id", protect, deletePost);

module.exports = router;
