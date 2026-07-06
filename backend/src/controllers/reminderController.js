import Reminder from "../models/Reminder.js";
import { toLocalDateTime } from "../utils/reminderTime.js";

/**
 * Normalize reminder payload
 */
function normalizeReminderPayload(
  payload = {},
  { applyDefaults = false } = {},
) {
  const {
    title,
    description,
    date,
    time,
    dateTime,
    category,

    // Recurring
    repeat,
    repeatInterval,
    repeatDays,
    endDate,
    occurrences,
  } = payload;

  let normalizedDate = date;
  let normalizedTime = time ?? null;

  // Support datetime-local input
  if ((!normalizedDate || normalizedTime === undefined) && dateTime) {
    const parsed = new Date(dateTime);

    if (!Number.isNaN(parsed.getTime())) {
      const iso = parsed.toISOString();

      normalizedDate = iso.slice(0, 10);
      normalizedTime = iso.slice(11, 16);
    }
  }

  return {
    ...(title !== undefined ? { title: title?.trim() } : {}),

    ...(description !== undefined
      ? { description: description.trim() }
      : applyDefaults
        ? { description: "" }
        : {}),

    ...(normalizedDate !== undefined ? { date: normalizedDate } : {}),

    ...(normalizedTime !== undefined ? { time: normalizedTime || null } : {}),

    ...(category !== undefined
      ? { category }
      : applyDefaults
        ? { category: "Other" }
        : {}),

    /* ==========================
       Recurring fields
    ========================== */

    ...(repeat !== undefined
      ? { repeat }
      : applyDefaults
        ? { repeat: "none" }
        : {}),

    ...(repeatInterval !== undefined
      ? {
          repeatInterval: Math.max(1, Number(repeatInterval)),
        }
      : applyDefaults
        ? { repeatInterval: 1 }
        : {}),

    ...(repeatDays !== undefined
      ? {
          repeatDays: Array.isArray(repeatDays) ? repeatDays : [],
        }
      : applyDefaults
        ? { repeatDays: [] }
        : {}),

    ...(endDate !== undefined
      ? {
          endDate: endDate || null,
        }
      : applyDefaults
        ? { endDate: null }
        : {}),

    ...(occurrences !== undefined
      ? {
          occurrences:
            occurrences === "" ||
            occurrences === null ||
            Number.isNaN(Number(occurrences))
              ? null
              : Number(occurrences),
        }
      : applyDefaults
        ? { occurrences: null }
        : {}),
  };
}

/**
 * CREATE REMINDER
 */

const createReminder = async (req, res) => {
  try {
    const payload = normalizeReminderPayload(req.body, {
      applyDefaults: true,
    });

    if (!payload.title || !payload.date) {
      return res.status(400).json({
        message: "Title and date are required",
      });
    }

    const reminder = await Reminder.create({
      userId: req.userId,

      ...payload,

      nextTriggerAt: toLocalDateTime(payload.date, payload.time),

      notificationState: "pending",

      completed: false,
    });

    res.status(201).json(reminder);
  } catch (err) {
    console.error("Create reminder error:", err);

    res.status(500).json({
      message: "Error creating reminder",
    });
  }
};

/**
 * GET ALL REMINDERS
 */

const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({
      userId: req.userId,
    }).sort({
      date: 1,
      time: 1,
    });

    res.json(reminders);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error fetching reminders",
    });
  }
};

/**
 * GET SINGLE REMINDER
 */

const getReminderById = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!reminder) {
      return res.status(404).json({
        message: "Reminder not found",
      });
    }

    res.json(reminder);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error fetching reminder",
    });
  }
};

/**
 * UPDATE REMINDER
 */

const updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!reminder) {
      return res.status(404).json({
        message: "Reminder not found",
      });
    }

    const payload = normalizeReminderPayload(req.body);

    if (payload.title !== undefined) reminder.title = payload.title;

    if (payload.description !== undefined)
      reminder.description = payload.description;

    if (payload.date !== undefined) reminder.date = payload.date;

    if (payload.time !== undefined) reminder.time = payload.time;

    if (payload.category !== undefined) reminder.category = payload.category;

    /* =======================
       Recurring
    ======================= */

    if (payload.repeat !== undefined) reminder.repeat = payload.repeat;

    if (payload.repeatInterval !== undefined)
      reminder.repeatInterval = payload.repeatInterval;

    if (payload.repeatDays !== undefined)
      reminder.repeatDays = payload.repeatDays;

    if (payload.endDate !== undefined) reminder.endDate = payload.endDate;

    if (payload.occurrences !== undefined)
      reminder.occurrences = payload.occurrences;

    // Reset reminder scheduling
    reminder.completed = false;

    reminder.notificationState = "pending";

    reminder.nextTriggerAt = toLocalDateTime(reminder.date, reminder.time);

    await reminder.save();

    res.json(reminder);
  } catch (err) {
    console.error("Update reminder error:", err);

    res.status(500).json({
      message: "Failed to update reminder",
    });
  }
};

/**
 * DELETE REMINDER
 */

const deleteReminder = async (req, res) => {
  try {
    const deleted = await Reminder.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Reminder not found",
      });
    }

    res.json({
      message: "Reminder deleted",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error deleting reminder",
    });
  }
};

export {
  createReminder,
  getReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
};
