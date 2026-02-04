import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getAllUsers,
  deleteUser,
  getAllPostsAdmin,
  deletePostAdmin,
  getDashboardStats,
} from "../controllers/adminController.js";

const router = express.Router();

// USERS
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

// POSTS
router.get("/posts", authMiddleware, adminMiddleware, getAllPostsAdmin);
router.delete("/posts/:id", authMiddleware, adminMiddleware, deletePostAdmin);

// DASHBOARD STATS
router.get("/stats", authMiddleware, adminMiddleware, getDashboardStats);

export default router;
