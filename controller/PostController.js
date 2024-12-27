const Post = require("../model/Post");

const createPost = async (req, res) => {
  const { caption, category, image, user_id, like_count, comment } = req.body;
  const post = await Post.create({ caption, category, image, user_id, like_count, comment });
  res.status(201).json(post);
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
};

const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) res.json(post);
  else res.status(404).json({ message: "Post not found" });
};

const deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (post) res.json({ message: "Post deleted" });
  else res.status(404).json({ message: "Post not found" });
};

const { createUserNotification } = require("../utils/notificationHelper");

// Like a post (example endpoint logic)
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.like_count += 1;
    await post.save();

    // Send a notification to the post owner
    await createUserNotification(
      "Post Liked",
      `Your post "${post.caption}" was liked!`,
      post.user_id
    );

    res.json({ message: "Post liked successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error liking post" });
  }
};



module.exports = { createPost, getAllPosts, getPostById, deletePost, likePost };
