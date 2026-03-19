import express from "express";
import { dispatchDueReminders } from "../utils/reminderDispatcher.js";

const router = express.Router();

router.get("/check-reminders", async (req, res) => {
  try {
    const configuredSecret = process.env.CRON_SECRET;
    const providedSecret = req.get("x-cron-secret") || req.query.key;

    if (configuredSecret && providedSecret !== configuredSecret) {
      return res.status(401).json({ message: "Unauthorized cron request" });
    }

    const result = await dispatchDueReminders();
    return res.json({ ok: true, ...result });
  } catch (error) {
    console.error("Cron reminder check failed:", error);
    return res.status(500).json({ ok: false, message: "Cron check failed" });
  }
});

export default router;