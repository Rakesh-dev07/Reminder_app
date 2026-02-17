import cron from "node-cron";
import Reminder from "../models/Reminder.js";
import User from "../models/User.js";
import { sendPushNotification } from "./push.js";

/**
 * Convert JS Date to YYYY-MM-DD format
 */
function formatDate(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Get date/time current minute (no seconds)
 */
function getCurrentDateTime() {
  const now = new Date();

  const date = formatDate(now);

  const time = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;

  return { date, time };
}

/**
 * Determine next recurrence date
 */
function getNextDate(reminder) {
  const { date, repeat, endDate } = reminder;

  if (repeat === "none") return null;

  const [year, month, day] = date.split("-").map(Number);
  let current = new Date(year, month - 1, day);

  if (repeat === "daily") current.setDate(current.getDate() + 1);
  if (repeat === "monthly") current.setMonth(current.getMonth() + 1);
  if (repeat === "yearly") current.setFullYear(current.getFullYear() + 1);

  const next = formatDate(current);

  if (endDate && next > endDate) return null;

  return next;
}

/**
 * Start scheduler
 */
export function startScheduler() {
  cron.schedule("*/1 * * * *", async () => {
    try {
      const { date: today, time: nowTime } = getCurrentDateTime();
      console.log("⏰ Checking reminders:", today, nowTime);
      console.log("Server time:", new Date());
      console.log("Reminder date:", reminder.date);


      // 🔹 timed reminders
      const dueTimed = await Reminder.find({
        date: today,
        time: nowTime,
        completed: false,
      });

      // 🔹 date-only reminders (default at 09:00)
      const DEFAULT_TIME = "09:00";
      let dueDateOnly = [];
      if (nowTime === DEFAULT_TIME) {
        dueDateOnly = await Reminder.find({
          date: today,
          time: null,
          completed: false,
        });
      }

      const dueReminders = [...dueTimed, ...dueDateOnly];

      for (const reminder of dueReminders) {
        const user = await User.findById(reminder.userId);
        if (!user?.fcmToken) continue;

        const title = reminder.title;
        const body = reminder.description || "You have a reminder";

        await sendPushNotification(user.fcmToken, title, body);

        // handle recurrence
        const nextDate = getNextDate(reminder);

        if (nextDate) {
          reminder.date = nextDate;
        } else {
          reminder.completed = true;
        }

        await reminder.save();
      }
    } catch (err) {
      console.error("Scheduler error:", err);
    }
  });

  console.log("🚀 Reminder Scheduler Active (runs every minute)");
}
