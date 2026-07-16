/**
 * ============================================================
 * AI Reminder Assistant
 * Output Schema
 * ============================================================
 *
 * The AI MUST always return this exact JSON structure.
 *
 * Rules:
 * - No markdown
 * - No explanations
 * - No extra fields
 * - Always valid JSON
 * - Missing values should be null or empty arrays
 *
 */

export const AI_REMINDER_SCHEMA = {
  success: true,

  confidence: 0.95,

  title: "",

  notes: "",

  category: "Other",

  date: "YYYY-MM-DD",

  time: "HH:mm",

  timezone: "Asia/Kolkata",

  recurrence: {
    type: "none",

    interval: 1,

    weekdays: [],

    monthDay: null,

    weekOfMonth: null,

    month: null,
  },

  missingFields: [],

  warnings: [],
};

export default AI_REMINDER_SCHEMA;

/**
 * Allowed reminder categories
 */
export const ALLOWED_CATEGORIES = [
  "Work",
  "Personal",
  "Study",
  "Other",
];

/**
 * Allowed recurrence types
 */
export const ALLOWED_RECURRENCE_TYPES = [
  "none",
  "daily",
  "weekly",
  "monthly",
  "yearly",
];