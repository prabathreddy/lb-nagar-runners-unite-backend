import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  approveBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

// Public
router.get("/", getAllBlogs);
router.get("/:id", authenticate, getBlogById);

// Authenticated users
router.post("/", authenticate, createBlog);
router.put("/:id", authenticate, updateBlog);
router.delete("/:id", authenticate, deleteBlog);

// Admin
router.put("/:id/approve", authenticate, requireAdmin, approveBlog);

export default router;