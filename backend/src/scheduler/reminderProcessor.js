import User from "../models/User.js";
import { sendPushNotification } from "../utils/push.js";

import {
  getNextOccurrence,
  shouldStopRecurrence,
  decreaseOccurrences,
} from "./recurrence.js";

/**
 * Process a single reminder.
 *
 * Responsibilities:
 * 1. Find user
 * 2. Send notification
 * 3. Handle recurrence
 * 4. Save reminder
 */

export async function processReminder(reminder) {
  try {
    const user = await User.findById(reminder.userId);

    if (!user?.fcmToken) {
      console.warn(
        `No FCM token found for user ${reminder.userId}`
      );
      return;
    }

    await sendPushNotification(
      user.fcmToken,
      reminder.title,
      reminder.description || "You have a reminder",
      reminder._id
    );

    reminder.lastNotifiedAt = new Date();

    const nextDate = getNextOccurrence(reminder);

    // One-time reminder
    if (!nextDate) {
      reminder.completed = true;
      reminder.notificationState = "sent";

      await reminder.save();
      return;
    }

    decreaseOccurrences(reminder);

    if (shouldStopRecurrence(reminder, nextDate)) {
      reminder.completed = true;
      reminder.notificationState = "sent";

      await reminder.save();
      return;
    }

    reminder.date = nextDate;

    reminder.notificationState = "pending";

    await reminder.save();

    console.log(
      `Recurring reminder updated -> ${nextDate}`
    );
  } catch (err) {
    console.error(
      "Reminder Processor Error:",
      err
    );
  }
}