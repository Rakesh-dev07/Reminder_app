/**
 * ============================================================
 * AI Reminder Assistant
 * Supported Natural Language Formats
 * ============================================================
 *
 * This file documents the reminder formats that the AI
 * Reminder Assistant officially supports.
 *
 * It is NOT used directly by the application.
 * It serves as the single source of truth for:
 *
 * - Prompt Engineering
 * - AI Examples
 * - Validation Rules
 * - Documentation
 *
 * ============================================================
 */

const supportedFormats = {
  /**
   * --------------------------------------------------------
   * One-Time Reminders
   * --------------------------------------------------------
   */
  oneTime: [
    "Remind me tomorrow at 10 AM to call mom",

    "Doctor appointment on July 20 at 3 PM",

    "Meeting next Friday at 6 PM",

    "Pay electricity bill on 15 August",

    "Buy groceries tonight at 8 PM",
  ],

  /**
   * --------------------------------------------------------
   * Daily
   * --------------------------------------------------------
   */
  daily: [
    "Drink water every day at 9 AM",

    "Take medicine daily at 8 PM",

    "Practice coding every 2 days",

    "Meditate every morning at 6 AM",
  ],

  /**
   * --------------------------------------------------------
   * Weekly
   * --------------------------------------------------------
   */
  weekly: [
    "Gym every Monday at 6 AM",

    "Call parents every Sunday",

    "Study every Tuesday and Thursday",

    "Workout every Monday Wednesday Friday",

    "Practice DSA every weekend",
  ],

  /**
   * --------------------------------------------------------
   * Monthly
   * --------------------------------------------------------
   */
  monthly: [
    "Pay rent every month on the 1st",

    "Water plants every 15th",

    "Insurance payment every 2 months",

    "Electricity bill every month",
  ],

  /**
   * --------------------------------------------------------
   * Yearly
   * --------------------------------------------------------
   */
  yearly: [
    "Mom's birthday every year",

    "Renew passport every 5 years",

    "Wedding anniversary every year",

    "Income tax reminder every year",
  ],

  /**
   * --------------------------------------------------------
   * Missing Information
   * --------------------------------------------------------
   */
  incomplete: [
    "Call mom",

    "Doctor appointment",

    "Gym tomorrow",

    "Pay rent",

    "Meeting next week",
  ],

  /**
   * --------------------------------------------------------
   * Notes
   * --------------------------------------------------------
   */
  notes: [
    "Call mom tomorrow at 8 PM. She'll be at work after noon.",

    "Doctor appointment next Friday. Carry previous reports.",

    "Gym every Monday. Focus on cardio.",
  ],

  /**
   * --------------------------------------------------------
   * Relative Dates
   * --------------------------------------------------------
   */
  relativeDates: [
    "Today",

    "Tomorrow",

    "Tonight",

    "This evening",

    "Next Monday",

    "Next Friday",

    "Next week",
  ],

  /**
   * --------------------------------------------------------
   * Time Expressions
   * --------------------------------------------------------
   */
  timeFormats: [
    "10 AM",

    "10:30 AM",

    "18:00",

    "6 PM",

    "Noon",

    "Midnight",

    "Morning",

    "Evening",
  ],
};

export default supportedFormats;

/**
 * ============================================================
 * Unsupported Formats (v2.1)
 * ============================================================
 */

export const unsupportedFormats = [
  "When I reach office",

  "If it rains tomorrow",

  "Remind me after Rahul replies",

  "When battery reaches 20%",

  "Every second Tuesday after payday",

  "Read reminders from my email",

  "Voice input",

  "Image reminders",

  "Calendar synchronization",
];