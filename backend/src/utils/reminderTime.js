const DEFAULT_DATE_ONLY_TIME = "09:00";

function toLocalDateTime(dateString, timeString) {
  if (!dateString) return null;

  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) return null;

  const effectiveTime = timeString || DEFAULT_DATE_ONLY_TIME;
  const [hours, minutes] = effectiveTime.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;

  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

function formatDate(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getNextDate(reminder) {
  const { date, repeat, endDate } = reminder;

  if (repeat === "none") return null;

  const [year, month, day] = date.split("-").map(Number);
  const current = new Date(year, month - 1, day);

  if (repeat === "daily") current.setDate(current.getDate() + 1);
  if (repeat === "monthly") current.setMonth(current.getMonth() + 1);
  if (repeat === "yearly") current.setFullYear(current.getFullYear() + 1);

  const next = formatDate(current);

  if (endDate && next > endDate) return null;

  return next;
}

export { DEFAULT_DATE_ONLY_TIME, toLocalDateTime, getNextDate };
