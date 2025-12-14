import Reminder from "../models/Reminder.js";

/**
 * CREATE a reminder
 */
export const createReminder = async (req, res) => {
  try {
    const { title, description, date, time, category, repeat, endDate } = req.body;
    console.log("📥 createReminder body:", req.body); // <--- add this line

    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required" });
    }

    const reminder = await Reminder.create({
      userId: req.userId,
      title,
      description: description || "",
      date,
      time: time || null,
      category: category || "Other",
      repeat: repeat || "none",
      endDate: endDate || null,
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
export const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Reminder.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Reminder not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update reminder error:", err);
    res.status(500).json({ message: "Error updating reminder" });
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
