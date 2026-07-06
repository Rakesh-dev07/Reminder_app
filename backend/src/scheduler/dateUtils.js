/**
 * Convert Date -> YYYY-MM-DD
 */
export function formatDate(date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Parse YYYY-MM-DD
 */
export function parseDate(dateString) {
  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  return new Date(year, month - 1, day);
}

/**
 * Get current date and time
 */
export function getCurrentDateTime() {
  const now = new Date();

  return {
    date: formatDate(now),

    time: `${String(
      now.getHours()
    ).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`,
  };
}

/**
 * Add days
 */
export function addDays(date, days) {
  const next = new Date(date);

  next.setDate(next.getDate() + days);

  return next;
}

/**
 * Add weeks
 */
export function addWeeks(date, weeks) {
  return addDays(date, weeks * 7);
}

/**
 * Add months
 */
export function addMonths(date, months) {
  const next = new Date(date);

  next.setMonth(
    next.getMonth() + months
  );

  return next;
}

/**
 * Add years
 */
export function addYears(date, years) {
  const next = new Date(date);

  next.setFullYear(
    next.getFullYear() + years
  );

  return next;
}

/**
 * Compare dates
 */
export function isAfter(dateA, dateB) {
  return (
    parseDate(dateA) >
    parseDate(dateB)
  );
}

/**
 * Weekday
 */
export function getWeekDay(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
  });
}