import React from "react";
import { toSafeDate, formatDateTime } from "../utils/date";
import { getCategoryStyle } from "../utils/ui";

const ReminderCard = ({ reminder, onDelete }) => {
  const date = toSafeDate(reminder);

  return (
    <div
      className="p-4 border rounded-xl 
      bg-white/50 dark:bg-slate-900/50 
      backdrop-blur 
      hover:shadow-md transition-all"
    >
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
        <p className="text-sm mt-2 text-slate-600 dark:text-slate-300 break-words">
          {reminder.description}
        </p>
      )}

      {/* DATE */}
      <p className="text-xs text-slate-500 mt-2">
        {formatDateTime(date)}
      </p>

      {/* ACTION */}
      {onDelete && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => onDelete(reminder._id)}
            className="text-xs px-3 py-1.5 rounded-md 
            bg-red-500 text-white 
            hover:bg-red-600 hover:scale-105 active:scale-95 
            transition-all"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ReminderCard;