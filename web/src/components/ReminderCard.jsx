import React from "react";

function toReminderDateTime(reminder) {
  if (reminder.dateTime) return new Date(reminder.dateTime);
  if (reminder.datetime) return new Date(reminder.datetime);
  if (reminder.date)
    return new Date(`${reminder.date}T${reminder.time || "09:00"}`);
  return new Date(0);
}

const ReminderCard = ({ reminder, onEdit, onDelete }) => {
  const date = toReminderDateTime(reminder);
  const categoryColors = {
  Work: "bg-blue-100 text-blue-700",
  Personal: "bg-green-100 text-green-700",
  Study: "bg-purple-100 text-purple-700",
  Other: "bg-gray-100 text-gray-600",
};

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-base">
          {reminder.title || "(no title)"}
        </h3>

        <span
  className={`text-[10px] px-2 py-0.5 rounded-full ${
    categoryColors[reminder.category] || categoryColors.Other
  }`}
>
  {reminder.category || "Other"}
</span>
      </div>

      {reminder.description && (
        <p className="mt-2 text-sm text-slate-500">
          {reminder.description}
        </p>
      )}

      <p className="mt-2 text-xs text-slate-400">
        {date.toLocaleString()}
      </p>

      <div className="mt-3 flex gap-2">
        {onEdit && (
          <button
            onClick={() => onEdit(reminder)}
            className="text-xs px-2 py-1 border rounded hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Edit
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(reminder._id)}
            className="text-xs px-2 py-1 border text-red-500 rounded hover:bg-red-50 dark:hover:bg-red-900/30"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ReminderCard;