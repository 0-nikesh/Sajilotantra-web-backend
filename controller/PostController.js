import Post from "../model/Post.js";
import createUserNotification from '../utils/notificationHelper.js';

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

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id; // Assuming user ID is available in `req.user`

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user has already liked the post
    if (post.liked_by.includes(userId)) {
      return res.status(400).json({ message: "You have already liked this post" });
    }

    // Add user to the liked_by array and increment like count
    post.liked_by.push(userId);
    post.like_count += 1;

    await post.save();

    // Send notification to the post owner
    if (post.user_id.toString() !== userId.toString()) { // Avoid notifying the user if they like their own post
      await createUserNotification(
        "Post Liked",
        `Your post "${post.caption}" was liked by ${req.user.name || "a user"}.`,
        post.user_id
      );
    }

    res.json({ message: "Post liked successfully", post });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Error liking post" });
  }
};


const addComment = async (req, res) => {
  const { commentText } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comment += 1; // Increment comment count or handle comment logic
    await post.save();

    // Send a notification to the post owner
    await createUserNotification(
      "New Comment",
      `Your post "${post.caption}" received a new comment.`,
      post.user_id
    );

    res.json({ message: "Comment added successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
};



export { addComment, createPost, deletePost, getAllPosts, getPostById, likePost };

