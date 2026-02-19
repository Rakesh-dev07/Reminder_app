import Reminder from "../models/Reminder.js";
import { toLocalDateTime } from "../utils/reminderTime.js";

function normalizeReminderPayload(payload = {}, { applyDefaults = false } = {}) {
  const {
    title,
    description,
    date,
    time,
    dateTime,
    category,
    repeat,
    endDate,
  } = payload;

  let normalizedDate = date;
  let normalizedTime = time ?? null;

  if ((!normalizedDate || normalizedTime === undefined) && dateTime) {
    const parsed = new Date(dateTime);
    if (!Number.isNaN(parsed.getTime())) {
      const iso = parsed.toISOString();
      normalizedDate = iso.slice(0, 10);
      normalizedTime = iso.slice(11, 16);
    }
  }

  return {
    ...(title !== undefined ? { title } : {}),
    ...(description !== undefined ? { description } : applyDefaults ? { description: "" } : {}),
    ...(normalizedDate !== undefined ? { date: normalizedDate } : {}),
    ...(normalizedTime !== undefined ? { time: normalizedTime || null } : {}),
    ...(category !== undefined ? { category } : applyDefaults ? { category: "Other" } : {}),
    ...(repeat !== undefined ? { repeat } : applyDefaults ? { repeat: "none" } : {}),
    ...(endDate !== undefined ? { endDate } : applyDefaults ? { endDate: null } : {}),
  };
}

/**
 * CREATE a reminder
 */
const createReminder = async (req, res) => {
  try {
    const payload = normalizeReminderPayload(req.body, { applyDefaults: true });

    if (!payload.title || !payload.date) {
      return res.status(400).json({ message: "Title and date are required" });
    }

    const reminder = await Reminder.create({
      userId: req.userId,
      ...payload,
      nextTriggerAt: toLocalDateTime(payload.date, payload.time),
      notificationState: "pending",
      completed: false,
    });

    res.json(reminder);
  } catch (err) {
    console.error("Create reminder error:", err);
    res.status(500).json({ message: "Error creating reminder" });
  }
};

/**
 * GET reminders of logged-in user
 */
const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.userId }).sort({ date: 1, time: 1 });
    res.json(reminders);
  } catch (err) {
    console.error("Fetch reminders error:", err);
    res.status(500).json({ message: "Error fetching reminders" });
  }
};

/**
 * GET a single reminder by id for logged-in user
 */
const getReminderById = async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await Reminder.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.json(reminder);
  } catch (err) {
    console.error("Fetch reminder by id error:", err);
    res.status(500).json({ message: "Error fetching reminder" });
  }
};

/**
 * UPDATE a reminder
 */
// PUT /reminders/:id
const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await Reminder.findOne({
      _id: id,
      userId: req.userId, // 🔐 keep user ownership check
    });

    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    const payload = normalizeReminderPayload(req.body);

    if (payload.date !== undefined) reminder.date = payload.date;
    if (payload.time !== undefined) reminder.time = payload.time;
    if (payload.title !== undefined) reminder.title = payload.title;
    if (payload.description !== undefined) reminder.description = payload.description;
    if (payload.repeat !== undefined) reminder.repeat = payload.repeat;
    if (payload.endDate !== undefined) reminder.endDate = payload.endDate;
    if (payload.category !== undefined) reminder.category = payload.category;

    reminder.nextTriggerAt = toLocalDateTime(reminder.date, reminder.time);
    reminder.completed = false;
    reminder.notificationState = "pending";

    await reminder.save();

    res.json(reminder);
  } catch (err) {
    console.error("Update reminder error:", err);
    res.status(500).json({ message: "Failed to update reminder" });
  }
};


/**
 * DELETE a reminder
 */
const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Reminder.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.json({ message: "Reminder deleted" });
  } catch (err) {
    console.error("Delete reminder error:", err);
    res.status(500).json({ message: "Error deleting reminder" });
  }
};

export {
  createReminder,
  getReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
};
