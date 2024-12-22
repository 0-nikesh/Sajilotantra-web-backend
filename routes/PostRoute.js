const express = require("express");
const { createPost, getAllPosts, getPostById, deletePost } = require("../controller/PostController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createPost);
router.get("/all", protect, admin, getAllPosts);
router.get("/:id", getPostById);
router.delete("/:id", protect, deletePost);

module.exports = router;
