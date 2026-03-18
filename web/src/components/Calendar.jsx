import React, { useMemo } from "react";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

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

  const getDateKey = (date) =>
    new Date(date).toISOString().slice(0, 10);

  const toggleDateFilter = (dateStr) => {
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
    <section className="rounded-2xl border bg-white/80 p-4 shadow-sm dark:bg-slate-900/80">
      
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Calendar</h2>
        <div className="flex items-center gap-1 text-xs">
          <button onClick={goPrevMonth}>‹</button>
          <span>{monthNames[month]} {year}</span>
          <button onClick={goNextMonth}>›</button>
        </div>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1 text-xs text-center">
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={i}></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = new Date(year, month, day)
            .toISOString()
            .slice(0, 10);

          const hasReminders = reminders.some(
            (r) =>
              getDateKey(r.dateTime || r.datetime) === dateStr
          );

          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={day}
              onClick={() => toggleDateFilter(dateStr)}
              className={`h-8 w-8 rounded-full ${
                isSelected ? "bg-indigo-600 text-white" : ""
              } ${hasReminders ? "font-bold" : "opacity-60"}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Calendar;