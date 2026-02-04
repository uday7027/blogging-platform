import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        message: "title and content not found",
      });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });
    return res.status(201).json({
      message: "post created successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    return res.status(200).json({
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email",
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Invalid post ID",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "not found",
      });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this post",
      });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();

    return res.status(200).json({
      message: "post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid post ID",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const isAuthor =
      post.author.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({
        message: "Not authorized to delete this post",
      });
    }

    await post.deleteOne();

    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Invalid post ID",
    });
  }
};


export const toggleLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const userId = req.user._id.toString();

    const isLiked = post.likes.some(
      (id) => id.toString() === userId
    );

    if (isLiked) {
      // UNLIKE
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // LIKE
      post.likes.push(req.user._id);
    }

    await post.save();

    return res.status(200).json({
      message: isLiked ? "Post unliked" : "Post liked",
      likesCount: post.likes.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Invalid post ID",
    });
  }
};

