import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  date: {
    type: String, // YYYY-MM-DD
    required: true,
  },

  time: {
    type: String, // HH:mm or null
    default: null,
  },

  category: {
    type: String,
    enum: ["Work", "Personal", "Study", "Other"],
    default: "Other",
  },

  // 🔁 recurrence
  repeat: {
    type: String,
    enum: ["none", "daily", "monthly", "yearly"],
    default: "none",
  },

  endDate: {
    type: String, // YYYY-MM-DD or null
    default: null,
  },

  // for one-time reminders
  completed: {
    type: Boolean,
    default: false,
  },

  notificationState: {
    type: String,
    enum: ["pending", "processing", "sent", "opened", "snoozed", "expired"],
    default: "pending",
  },

  nextTriggerAt: {
    type: Date,
    default: null,
    index: true,
  },

  lastNotifiedAt: {
    type: Date,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

reminderSchema.index({ completed: 1, notificationState: 1, nextTriggerAt: 1 });

export default mongoose.model("Reminder", reminderSchema);
