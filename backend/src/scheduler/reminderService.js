import Reminder from "../models/Reminder.js";
import { getCurrentDateTime } from "./dateUtils.js";
import { processReminder } from "./reminderProcessor.js";

const DEFAULT_TIME = "09:00";

/**
 * Find all reminders due right now.
 */
export async function findDueReminders() {
  const { date: today, time: nowTime } = getCurrentDateTime();

  const timedReminders = await Reminder.find({
    completed: false,
    notificationState: "pending",
    date: today,
    time: {
      $gte: nowTime,
      $lt: `${nowTime}:59`,
    },
  });

  let dateOnlyReminders = [];

  if (nowTime === DEFAULT_TIME) {
    dateOnlyReminders = await Reminder.find({
      completed: false,
      notificationState: "pending",
      date: today,
      time: null,
    });
  }

  return [...timedReminders, ...dateOnlyReminders];
}

/**
 * Process every due reminder.
 */
export async function processDueReminders() {
  const reminders = await findDueReminders();

  if (!reminders.length) {
    return {
      processed: 0,
    };
  }

  for (const reminder of reminders) {
    await processReminder(reminder);
  }

  return {
    processed: reminders.length,
  };
}