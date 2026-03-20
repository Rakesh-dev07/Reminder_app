export function toSafeDate(reminder) {
  if (!reminder) return null;

  if (reminder.dateTime) return new Date(reminder.dateTime);
  if (reminder.datetime) return new Date(reminder.datetime);

  if (reminder.date) {
    return new Date(`${reminder.date}T${reminder.time || "09:00"}`);
  }

  return null;
}

export function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

export function getDateKey(date) {
  if (!date || isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatDateTime(date) {
  if (!isValidDate(date)) return "Invalid date";
  return date.toLocaleString();
}

export function isFutureDate(date) {
  if (!isValidDate(date)) return false;
  return date > new Date();
}