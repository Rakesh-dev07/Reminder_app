import {
  ALLOWED_CATEGORIES,
  ALLOWED_RECURRENCE_TYPES,
} from "../ai/schema.js";

/**
 * ============================================================
 * AI Reminder Normalizer
 * ============================================================
 *
 * Converts AI output into the application's
 * canonical format.
 *
 * This file ASSUMES the response has already
 * passed validation.
 */

const CATEGORY_MAP = {
  work: "Work",
  personal: "Personal",
  study: "Study",
  other: "Other",

  health: "Personal",
  fitness: "Personal",

  education: "Study",

  office: "Work",

  finance: "Other",
  bills: "Other",
};

const RECURRENCE_MAP = {
  none: "none",

  daily: "daily",
  day: "daily",

  weekly: "weekly",
  week: "weekly",

  monthly: "monthly",
  month: "monthly",

  yearly: "yearly",
  annual: "yearly",
  yearly: "yearly",
};

const WEEKDAY_MAP = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function normalizeCategory(category = "Other") {
  const key = category.trim().toLowerCase();

  const normalized =
    CATEGORY_MAP[key] || "Other";

  return ALLOWED_CATEGORIES.includes(normalized)
    ? normalized
    : "Other";
}

function normalizeRecurrence(type = "none") {
  const key = type.trim().toLowerCase();

  const normalized =
    RECURRENCE_MAP[key] || "none";

  return ALLOWED_RECURRENCE_TYPES.includes(
    normalized
  )
    ? normalized
    : "none";
}

function normalizeWeekdays(days = []) {
  if (!Array.isArray(days)) return [];

  return days
    .map((day) => {
      const key = day.trim().toLowerCase();

      return WEEKDAY_MAP[key];
    })
    .filter(Boolean);
}

/**
 * Main Normalizer
 */
export function normalizeAIResponse(data) {
  return {
    ...data,

    title: data.title?.trim() || "",

    notes: data.notes?.trim() || "",

    category: normalizeCategory(
      data.category
    ),

    date: data.date || null,

    time: data.time || null,

    timezone:
      data.timezone || "Asia/Kolkata",

    recurrence: {
      ...data.recurrence,

      type: normalizeRecurrence(
        data.recurrence.type
      ),

      interval: Math.max(
        1,
        Number(data.recurrence.interval || 1)
      ),

      weekdays: normalizeWeekdays(
        data.recurrence.weekdays
      ),

      monthDay:
        data.recurrence.monthDay || null,

      weekOfMonth:
        data.recurrence.weekOfMonth ||
        null,

      month:
        data.recurrence.month || null,
    },

    missingFields:
      data.missingFields || [],

    warnings: data.warnings || [],
  };
}

export default normalizeAIResponse;