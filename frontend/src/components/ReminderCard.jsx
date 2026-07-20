import React from "react";
import { toSafeDate, formatDateTime } from "../utils/date";
import { getCategoryStyle } from "../utils/ui";

const ReminderCard = ({ reminder, onDelete }) => {
  const date = toSafeDate(reminder);

  return (
    <div className="app-list-item hover:shadow-md">
      {/* TITLE + CATEGORY */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="font-semibold break-words">
          {reminder.title}
        </h3>

        <span
          className={`px-2.5 py-1 text-[10px] rounded-full font-semibold tracking-wide 
          ${getCategoryStyle(reminder.category)}`}
        >
          {reminder.category || "Other"}
        </span>
      </div>

      {/* DESCRIPTION */}
      {reminder.description && (
        <p className="app-text-muted mt-2 break-words text-sm">
          {reminder.description}
        </p>
      )}

      {/* DATE */}
      <p className="app-text-muted mt-2 text-xs">
        {formatDateTime(date)}
      </p>

      {/* ACTION */}
      {onDelete && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => onDelete(reminder._id)}
            className="btn-danger-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ReminderCard;