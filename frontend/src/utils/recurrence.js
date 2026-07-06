// utils/recurrence.js

export const REPEAT_OPTIONS = [
  {
    value: "none",
    label: "Never",
  },
  {
    value: "daily",
    label: "Daily",
  },
  {
    value: "weekly",
    label: "Weekly",
  },
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "yearly",
    label: "Yearly",
  },
];

export const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const WEEK_DAY_SHORT = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
};

/**
 * Toggle a weekday inside repeatDays
 */

export function toggleWeekDay(days, day) {
  if (days.includes(day)) {
    return days.filter((d) => d !== day);
  }

  return [...days, day];
}

/**
 * Convert repeat option into readable text
 */

export function getRepeatLabel(type) {
  const option = REPEAT_OPTIONS.find(
    (item) => item.value === type
  );

  return option?.label || "Never";
}

/**
 * Build repeat summary
 *
 * Example:
 *
 * Every day
 * Every 2 weeks
 * Every month
 */

export function buildRepeatSummary(reminder) {
  if (!reminder || reminder.repeat === "none") {
    return "Does not repeat";
  }

  const interval = reminder.repeatInterval || 1;

  switch (reminder.repeat) {
    case "daily":
      return interval === 1
        ? "Every day"
        : `Every ${interval} days`;

    case "weekly":
      return interval === 1
        ? "Every week"
        : `Every ${interval} weeks`;

    case "monthly":
      return interval === 1
        ? "Every month"
        : `Every ${interval} months`;

    case "yearly":
      return interval === 1
        ? "Every year"
        : `Every ${interval} years`;

    default:
      return "Custom";
  }
}

/**
 * Validate recurrence
 */

export function validateRecurrence(form) {
  const errors = {};

  if (form.repeat !== "none") {
    if (
      !form.repeatInterval ||
      Number(form.repeatInterval) < 1
    ) {
      errors.repeatInterval =
        "Repeat interval must be at least 1.";
    }

    if (
      form.repeat === "weekly" &&
      form.repeatDays.length === 0
    ) {
      errors.repeatDays =
        "Select at least one weekday.";
    }

    if (
      form.occurrences &&
      Number(form.occurrences) < 1
    ) {
      errors.occurrences =
        "Occurrences must be greater than zero.";
    }

    if (
      form.endDate &&
      form.dateTime &&
      new Date(form.endDate) <
        new Date(form.dateTime)
    ) {
      errors.endDate =
        "End date must be after reminder date.";
    }
  }

  return errors;
}

/**
 * Reset recurrence fields
 */

export function resetRecurrence() {
  return {
    repeat: "none",
    repeatInterval: 1,
    repeatDays: [],
    endDate: "",
    occurrences: "",
  };
}