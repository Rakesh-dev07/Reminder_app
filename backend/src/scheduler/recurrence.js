import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  formatDate,
  isAfter,
  parseDate,
  getWeekDay,
} from "./dateUtils.js";

/**
 * Returns true if reminder should stop repeating.
 */
export function shouldStopRecurrence(reminder, nextDate) {
  // Stop after end date
  if (reminder.endDate && isAfter(nextDate, reminder.endDate)) {
    return true;
  }

  // Stop after occurrences
  if (
    reminder.occurrences !== null &&
    reminder.occurrences !== undefined &&
    reminder.occurrences <= 1
  ) {
    return true;
  }

  return false;
}

/**
 * Decrease occurrences after reminder fires.
 */
export function decreaseOccurrences(reminder) {
  if (
    reminder.occurrences !== null &&
    reminder.occurrences !== undefined &&
    reminder.occurrences > 0
  ) {
    reminder.occurrences -= 1;
  }
}

/**
 * Get next weekly occurrence.
 *
 * Supports:
 *
 * Monday
 * Monday + Friday
 * Every 2 weeks
 */
function getNextWeeklyDate(reminder) {
  const interval = reminder.repeatInterval || 1;

  const selectedDays =
    reminder.repeatDays?.length > 0
      ? reminder.repeatDays
      : [getWeekDay(parseDate(reminder.date))];

  let current = parseDate(reminder.date);

  for (let i = 1; i <= interval * 7; i++) {
    const next = addDays(current, i);

    const dayName = getWeekDay(next);

    if (selectedDays.includes(dayName)) {
      return formatDate(next);
    }
  }

  // fallback
  return formatDate(addWeeks(current, interval));
}

/**
 * Returns next reminder date.
 */
export function getNextOccurrence(reminder) {
  if (reminder.repeat === "none") {
    return null;
  }

  const current = parseDate(reminder.date);

  const interval = reminder.repeatInterval || 1;

  let next;

  switch (reminder.repeat) {
    case "daily":
      next = addDays(current, interval);
      break;

    case "weekly":
      return getNextWeeklyDate(reminder);

    case "monthly":
      next = addMonths(current, interval);
      break;

    case "yearly":
      next = addYears(current, interval);
      break;

    default:
      return null;
  }

  return formatDate(next);
}