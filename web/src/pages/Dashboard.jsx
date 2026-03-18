import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AddReminder from "../components/AddReminder";
import Sidebar from "../components/Sidebar";
import { api } from "../services/api";
import { useDarkMode } from "../hooks/useDarkMode";

const CATEGORY_OPTIONS = ["All", "Work", "Personal", "Study", "Other"];

function toReminderDateTime(reminder) {
  if (reminder.dateTime) return new Date(reminder.dateTime);
  if (reminder.datetime) return new Date(reminder.datetime);
  if (reminder.date)
    return new Date(`${reminder.date}T${reminder.time || "09:00"}`);
  return new Date(0);
}

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

const Dashboard = () => {
  const { user, token, logout } = useAuth(); // adjust if your AuthContext uses different names

  const [isDark, setIsDark] = useDarkMode();
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingReminder, setEditingReminder] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  // Fetch reminders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getReminders(token);
        setReminders(data || []);
      } catch (error) {
        console.error("Error fetching reminders", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  const handleCreateReminder = async (payload) => {
    const newReminder = await api.createReminder(token, payload);
    setReminders((prev) => [...prev, newReminder]);
  };

  const handleDeleteReminder = async (id) => {
    await api.deleteReminder(token, id);
    setReminders((prev) => prev.filter((r) => r._id !== id));
    if (editingReminder && editingReminder._id === id) {
      setEditingReminder(null);
    }
  };

  const handleUpdateReminder = async (id, payload) => {
    const updated = await api.updateReminder(token, id, payload);
    setReminders((prev) => prev.map((r) => (r._id === id ? updated : r)));
    setEditingReminder(null);
  };

  const toggleDateFilter = (dateStr) => {
    setSelectedDate((prev) => (prev === dateStr ? null : dateStr));
  };

  // Calendar utilities
  const daysInMonth = useMemo(
    () => new Date(year, month + 1, 0).getDate(),
    [month, year],
  );

  const firstDayIndex = useMemo(
    () => new Date(year, month, 1).getDay(), // 0 = Sunday
    [month, year],
  );

  const getDateKey = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
  };

  // Filtered reminders
  const filteredReminders = useMemo(() => {
    return reminders
      .slice()
      .sort((a, b) => toReminderDateTime(a) - toReminderDateTime(b))
      .filter((r) => {
        const catMatch =
          selectedCategory === "All" ||
          (r.category || "Other") === selectedCategory;

        const dateKey = getDateKey(toReminderDateTime(r));
        const dateMatch =
          !selectedDate || (selectedDate && dateKey === selectedDate);

        return catMatch && dateMatch;
      });
  }, [reminders, selectedCategory, selectedDate]);

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

  const darkToggleLabel = isDark ? "Light" : "Dark";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Reminder App
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Stay on top of things — with notifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
  <button
    onClick={() => setIsDark((v) => !v)}
    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
  >
    <span className="text-lg">{isDark ? "🌙" : "☀️"}</span>
    <span>{darkToggleLabel} mode</span>
  </button>

  {/* Hamburger icon */}
  <button
    onClick={() => setIsSidebarOpen(true)}
    className="flex flex-col justify-between w-6 h-5 cursor-pointer"
  >
    <span className="block h-1 bg-slate-700 dark:bg-white rounded"></span>
    <span className="block h-1 bg-slate-700 dark:bg-white rounded"></span>
    <span className="block h-1 bg-slate-700 dark:bg-white rounded"></span>
  </button>
</div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          {/* Left: form + reminders list */}
          <div className="space-y-4">
            <AddReminder
              onCreate={handleCreateReminder}
              onUpdate={handleUpdateReminder}
              editingReminder={editingReminder}
              onCancelEdit={() => setEditingReminder(null)}
            />

            <section className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">Reminders</h2>
                <div className="flex flex-wrap items-center gap-2">
                  {/* Category filter */}
                  <div className="flex flex-wrap gap-1 rounded-full bg-slate-100 px-1 py-1 text-xs dark:bg-slate-800">
                    {CATEGORY_OPTIONS.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`rounded-full px-2.5 py-1 transition ${
                          selectedCategory === cat
                            ? "bg-indigo-600 text-white shadow-sm dark:bg-indigo-500"
                            : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Selected date chip */}
                  {selectedDate && (
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      <span>{selectedDate}</span>
                      <span aria-hidden>✕</span>
                    </button>
                  )}
                </div>
              </div>

              {loading ? (
                <p className="text-sm text-slate-500">Loading…</p>
              ) : filteredReminders.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No reminders found. Try changing filters or add a new one.
                </p>
              ) : (
                <ul className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
                  {filteredReminders.map((rem) => {
                    const date = toReminderDateTime(rem);
                    const dateKey = getDateKey(date);
                    const isToday =
                      dateKey === new Date().toISOString().slice(0, 10);

                    return (
                      <li
                        key={rem._id}
                        className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">
                              {rem.title || "(no title)"}
                            </h3>
                            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                              {rem.category || "Other"}
                            </span>
                            {isToday && (
                              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200">
                                Today
                              </span>
                            )}
                          </div>
                          {rem.description && (
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {rem.description}
                            </p>
                          )}
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {date.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <button
                            onClick={() => setEditingReminder(rem)}
                            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteReminder(rem._id)}
                            className="rounded-full border border-rose-200 px-3 py-1 text-xs font-medium text-rose-700 transition hover:bg-rose-50 dark:border-rose-700/60 dark:text-rose-300 dark:hover:bg-rose-950/50"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </div>

          {/* Right: Calendar */}
          <aside className="space-y-4">
            <section className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Calendar</h2>
                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={goPrevMonth}
                    className="rounded-full border border-slate-200 px-2 py-1 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    ‹
                  </button>
                  <span className="px-1">
                    {monthNames[month]} {year}
                  </span>
                  <button
                    onClick={goNextMonth}
                    className="rounded-full border border-slate-200 px-2 py-1 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-slate-500 dark:text-slate-400">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="py-1">
                    {d}
                  </div>
                ))}
              </div>

              <div className="mt-1 grid grid-cols-7 gap-1 text-center text-xs">
                {/* Empty slots before 1st */}
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {/* Days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = new Date(year, month, day)
                    .toISOString()
                    .slice(0, 10);

                  const hasReminders = reminders.some(
                    (r) => getDateKey(toReminderDateTime(r)) === dateStr
                  );

                  const isSelected = selectedDate === dateStr;
                  const isToday =
                    dateStr === new Date().toISOString().slice(0, 10);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDateFilter(dateStr)}
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-full border text-xs transition",
                        "border-transparent",
                        hasReminders
                          ? "font-semibold text-slate-800 dark:text-slate-100"
                          : "text-slate-500 dark:text-slate-400",
                        isToday &&
                          !isSelected &&
                          "border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-950/40",
                        isSelected &&
                          "bg-indigo-600 text-white shadow-sm dark:bg-indigo-500",
                        !hasReminders &&
                          !isToday &&
                          !isSelected &&
                          "opacity-60",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
                Tap a date to filter reminders. Tap again to clear the filter.
              </p>
            </section>
          </aside>
        </div>
      </main>
    <Sidebar
  isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
  user={user}
  logout={logout}
/>
    </div>
  );
};

export default Dashboard;
