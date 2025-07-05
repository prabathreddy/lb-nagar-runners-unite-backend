import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
import { registerForEvent } from "../controllers/registration.controller.js";

const router = express.Router();

// Public
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// Registration (authenticated users)
router.post("/:id/register", authenticate, registerForEvent);

// Admin only
router.post("/", authenticate, requireAdmin, createEvent);
router.put("/:id", authenticate, requireAdmin, updateEvent);
router.delete("/:id", authenticate, requireAdmin, deleteEvent);

export default router;