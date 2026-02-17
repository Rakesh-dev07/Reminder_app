import Reminder from "../models/Reminder.js";

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
export const createReminder = async (req, res) => {
  try {
    const payload = normalizeReminderPayload(req.body, { applyDefaults: true });

    if (!payload.title || !payload.date) {
      return res.status(400).json({ message: "Title and date are required" });
    }

    const reminder = await Reminder.create({
      userId: req.userId,
      ...payload,
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
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.userId }).sort({ date: 1, time: 1 });
    res.json(reminders);
  } catch (err) {
    console.error("Fetch reminders error:", err);
    res.status(500).json({ message: "Error fetching reminders" });
  }
};

/**
 * UPDATE a reminder
 */
// PUT /reminders/:id
export const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await Reminder.findOne({
      _id: id,
      userId: req.userId, // 🔐 keep user ownership check
    });

    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    // Update fields
    reminder.date = req.body.date;
    reminder.time = req.body.time;
    reminder.title = req.body.title;
    reminder.description = req.body.description;
    reminder.repeat = req.body.repeat;
    reminder.endDate = req.body.endDate;

    // 🔥 CRITICAL FIX
    reminder.completed = false;

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
export const deleteReminder = async (req, res) => {
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
