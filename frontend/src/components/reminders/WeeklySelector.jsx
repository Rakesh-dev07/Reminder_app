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
      <label className="app-label">
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
              className={active ? "app-day-btn-active" : "app-day-btn"}
            >
              {WEEK_DAY_SHORT[day]}
            </button>
          );
        })}
      </div>

      {selectedDays.length > 0 && (
        <p className="app-text-muted text-xs">
          Selected: {selectedDays.join(", ")}
        </p>
      )}
    </div>
  );
};

export default WeeklySelector;