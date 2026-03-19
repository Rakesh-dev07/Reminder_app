import React, { useMemo } from "react";
import { toSafeDate, getDateKey } from "../Utils/date";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({
  reminders,
  selectedDate,
  setSelectedDate,
  month,
  setMonth,
  year,
  setYear,
}) => {

  const daysInMonth = useMemo(
    () => new Date(year, month + 1, 0).getDate(),
    [month, year]
  );

  const firstDayIndex = useMemo(
    () => new Date(year, month, 1).getDay(),
    [month, year]
  );

  const toggleDate = (dateStr) => {
    setSelectedDate((prev) => (prev === dateStr ? null : dateStr));
  };

  const goPrevMonth = () => {
    setMonth((m) => {
      if (m === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const goNextMonth = () => {
    setMonth((m) => {
      if (m === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
      
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Calendar</h2>

        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={goPrevMonth}
            className="px-2 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            ‹
          </button>

          <span className="font-medium">
            {monthNames[month]} {year}
          </span>

          <button
            onClick={goNextMonth}
            className="px-2 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            ›
          </button>
        </div>
      </div>

      {/* ✅ WEEKDAY ROW */}
      <div className="grid grid-cols-7 mb-2 text-xs text-slate-500 text-center">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* DAYS GRID */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        
        {/* Empty slots */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={i}></div>
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;

          const dateStr = new Date(year, month, day)
            .toISOString()
            .slice(0, 10);

          const hasReminder = reminders.some((r) => {
            const key = getDateKey(toSafeDate(r));
            return key === dateStr;
          });

          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={day}
              onClick={() => toggleDate(dateStr)}
              className={`h-8 w-8 flex items-center justify-center transition
              
                ${isSelected 
                  ? "bg-indigo-600 text-white rounded-md"   // ✅ square
                  : "rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
                }

                ${hasReminder ? "font-semibold" : "opacity-60"}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;