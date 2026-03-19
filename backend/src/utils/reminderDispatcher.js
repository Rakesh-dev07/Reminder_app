import Reminder from "../models/Reminder.js";
import User from "../models/User.js";
import { sendPushNotification } from "./push.js";
import { getNextDate, toLocalDateTime } from "./reminderTime.js";

async function backfillMissingNextTriggerAt() {
  const reminders = await Reminder.find({ completed: false, nextTriggerAt: null }).limit(200);

  if (!reminders.length) return 0;

  const ops = reminders
    .map((reminder) => {
      const nextTriggerAt = toLocalDateTime(reminder.date, reminder.time);
      if (!nextTriggerAt) return null;

      return {
        updateOne: {
          filter: { _id: reminder._id, nextTriggerAt: null },
          update: {
            $set: {
              nextTriggerAt,
              notificationState: reminder.notificationState || "pending",
            },
          },
        },
      };
    })
    .filter(Boolean);

  if (!ops.length) return 0;

  await Reminder.bulkWrite(ops);
  return ops.length;
}

export async function dispatchDueReminders() {
  const now = new Date();

  const backfilled = await backfillMissingNextTriggerAt();
  const dueCandidates = await Reminder.find({
    completed: false,
    notificationState: "pending",
    nextTriggerAt: { $lte: now },
  })
    .sort({ nextTriggerAt: 1 })
    .limit(100);

  let processed = 0;
  let sent = 0;

  for (const candidate of dueCandidates) {
    const reminder = await Reminder.findOneAndUpdate(
      {
        _id: candidate._id,
        completed: false,
        notificationState: "pending",
        nextTriggerAt: { $lte: now },
      },
      {
        $set: {
          notificationState: "processing",
        },
      },
      { new: true }
    );

    if (!reminder) continue;

    processed += 1;

    const user = await User.findById(reminder.userId).select("fcmToken");

    if (user?.fcmToken) {
      await sendPushNotification(
        user.fcmToken,
        reminder.title,
        reminder.description || "You have a reminder",
        reminder._id
      );
      sent += 1;
    }

    const nextDate = getNextDate(reminder);

    if (nextDate) {
      const nextTriggerAt = toLocalDateTime(nextDate, reminder.time);
      await Reminder.updateOne(
        { _id: reminder._id },
        {
          $set: {
            date: nextDate,
            nextTriggerAt,
            notificationState: "pending",
            lastNotifiedAt: now,
          },
        }
      );
    } else {
      await Reminder.updateOne(
        { _id: reminder._id },
        {
          $set: {
            completed: true,
            notificationState: "sent",
            lastNotifiedAt: now,
          },
        }
      );
    }
  }

  return {
    checkedAt: now,
    backfilled,
    dueCount: dueCandidates.length,
    processed,
    sent,
  };
}