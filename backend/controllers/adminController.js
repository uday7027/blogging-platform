import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Invalid user ID" });
  }
};

export const getAllPostsAdmin = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePostAdmin = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted by admin" });
  } catch (error) {
    res.status(400).json({ message: "Invalid post ID" });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const postsCount = await Post.countDocuments();
    const commentsCount = await Comment.countDocuments();

    res.status(200).json({
      users: usersCount,
      posts: postsCount,
      comments: commentsCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
