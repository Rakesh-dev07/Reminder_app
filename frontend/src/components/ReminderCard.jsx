import React from "react";
import { toSafeDate, formatDateTime } from "../utils/date";
import { getCategoryStyle } from "../utils/ui";

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
  className={`inline-flex items-center px-2.5 py-1 text-[10px] rounded-full font-semibold tracking-wide 
  ${getCategoryStyle(rem.category)}`}
>
  {rem.category || "Other"}
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