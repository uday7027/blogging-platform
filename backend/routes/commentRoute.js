import express from "express";
import { addComment, getCommentsByPost, deleteComment } from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express().router;

//public
router.get("/:postId", getCommentsByPost);

//private
router.post("/:postId", authMiddleware, addComment);
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;