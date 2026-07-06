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
    trim: true,
  },

  description: {
    type: String,
    default: "",
    trim: true,
  },

  date: {
    type: String, // YYYY-MM-DD
    required: true,
  },

  time: {
    type: String, // HH:mm
    default: null,
  },

  category: {
    type: String,
    enum: ["Work", "Personal", "Study", "Other"],
    default: "Other",
  },

  /* ===============================
     RECURRING REMINDERS
  =============================== */

  repeat: {
    type: String,
    enum: [
      "none",
      "daily",
      "weekly",
      "monthly",
      "yearly",
      "custom",
    ],
    default: "none",
  },

  // Every X days/weeks/months/years
  repeatInterval: {
    type: Number,
    default: 1,
    min: 1,
  },

  // Used only for weekly reminders
  repeatDays: [
    {
      type: String,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
  ],

  // Stop repeating after this date
  endDate: {
    type: String, // YYYY-MM-DD
    default: null,
  },

  // Optional: Stop after N occurrences
  occurrences: {
    type: Number,
    default: null,
    min: 1,
  },

  /* ===============================
     REMINDER STATUS
  =============================== */

  completed: {
    type: Boolean,
    default: false,
  },

  notificationState: {
    type: String,
    enum: [
      "pending",
      "processing",
      "sent",
      "opened",
      "snoozed",
      "expired",
    ],
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
},
{
  timestamps: true,
});

// Index for scheduler
reminderSchema.index({
  completed: 1,
  notificationState: 1,
  nextTriggerAt: 1,
});

export default mongoose.model("Reminder", reminderSchema);