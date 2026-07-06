import React from "react";
import {
  WEEK_DAYS,
  WEEK_DAY_SHORT,
  toggleWeekDay,
} from "../../utils/recurrence";

const WeeklySelector = ({ selectedDays = [], onChange }) => {
  const handleToggle = (day) => {
    const updated = toggleWeekDay(selectedDays, day);
    onChange(updated);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
        Repeat On
      </label>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {WEEK_DAYS.map((day) => {
          const active = selectedDays.includes(day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleToggle(day)}
              className={`rounded-xl border px-3 py-2 text-sm font-medium transition
                ${
                  active
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:bg-slate-700"
                }`}
            >
              {WEEK_DAY_SHORT[day]}
            </button>
          );
        })}
      </div>

      {selectedDays.length > 0 && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Selected: {selectedDays.join(", ")}
        </p>
      )}
    </div>
  );
};

export default WeeklySelector;