import React, { useMemo } from "react";
import { toSafeDate, getDateKey } from "../utils/date";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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
    [month, year],
  );

  const firstDayIndex = useMemo(
    () => new Date(year, month, 1).getDay(),
    [month, year],
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
    <div className="app-card p-2">
      {/* HEADER */}
      <div className="mb-4 mt-2 px-2 flex items-center justify-between">
        <h2 className=" text-sm font-semibold">Calendar</h2>

        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={goPrevMonth}
            className="app-calendar-nav"
          >
            ‹
          </button>

          <span className="font-medium">
            {monthNames[month]} {year}
          </span>

          <button
            onClick={goNextMonth}
            className="app-calendar-nav"
          >
            ›
          </button>
        </div>
      </div>

      {/* ✅ WEEKDAY ROW */}
      <div className="app-calendar-weekday mb-2 grid grid-cols-7 text-center">
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

          const date = new Date(year, month, day);
          const dateStr = getDateKey(date);

          const hasReminder = reminders.some((r) => {
            const key = getDateKey(toSafeDate(r));
            return key === dateStr;
          });

          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={day}
              onClick={() => toggleDate(dateStr)}
              className={`${
                  isSelected
                    ? "app-calendar-day-selected"
                    : "app-calendar-day"
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
