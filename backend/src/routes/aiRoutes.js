import express from "express";

import parseReminderController from "../controllers/aiController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * POST /api/ai/parse
 *
 * Parse natural language reminder.
 */
router.post("/parse", authMiddleware, parseReminderController);

export default router;
