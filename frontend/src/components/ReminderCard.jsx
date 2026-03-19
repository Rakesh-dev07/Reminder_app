import React from "react";
import { toSafeDate, formatDateTime } from "../Utils/date";

const categoryColors = {
  Work: "bg-blue-100 text-blue-700",
  Personal: "bg-green-100 text-green-700",
  Study: "bg-purple-100 text-purple-700",
  Other: "bg-gray-100 text-gray-600",
};

const ReminderCard = ({ reminder, onEdit, onDelete }) => {
  const date = toSafeDate(reminder);

  return (
    <div className="p-4 border rounded shadow-sm">
      <h3 className="font-semibold">{reminder.title}</h3>

      <span
        className={`text-xs px-2 py-1 rounded ${
          categoryColors[reminder.category] || categoryColors.Other
        }`}
      >
        {reminder.category || "Other"}
      </span>

      <p className="text-sm mt-2">{reminder.description}</p>

      <p className="text-xs text-slate-500 mt-1">
        {formatDateTime(date)}
      </p>

      <div className="mt-2 flex gap-2">
        {onEdit && <button onClick={() => onEdit(reminder)}>Edit</button>}
        {onDelete && (
          <button onClick={() => onDelete(reminder._id)}>Delete</button>
        )}
      </div>
    </div>
  );
};

export default ReminderCard;