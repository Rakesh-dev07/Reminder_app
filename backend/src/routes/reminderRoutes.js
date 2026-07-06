import express from "express";
import {
  createReminder,
  getReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
} from "../controllers/reminderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All endpoints protected
router.use(authMiddleware);
router.post("/", createReminder);
router.get("/", getReminders);
router.get("/:id", getReminderById);
router.put("/:id", updateReminder);
router.delete("/:id", deleteReminder);

export default router;
