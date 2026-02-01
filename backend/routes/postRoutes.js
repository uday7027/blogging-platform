import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost} from "../controllers/postController.js";


const router = express.Router();
//public
router.get("/",getAllPosts);
router.get("/:id", getSinglePost);

//private
router.post("/", authMiddleware, createPost);
router.put("/:id",authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;