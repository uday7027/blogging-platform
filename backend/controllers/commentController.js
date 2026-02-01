import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = await Comment.create({
      text,
      post: req.params.postId,
      author: req.user._id,
    });

    return res.status(201).json({
      message: "Comment added",
      comment,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Invalid request",
    });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: comments.length,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Invalid Post ID",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this comment",
      });
    }

    await comment.deleteOne();

    return res.status(200).json({
      message: "Comment deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Invalid comment ID",
    });
  }
};
