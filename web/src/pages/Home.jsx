import React, { useMemo, useState } from "react";
import Layout from "../components/Layout";
import AddReminder from "../components/AddReminder";
import Calendar from "../components/Calendar";
import { useReminders } from "../hooks/useReminders";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

const CATEGORY_OPTIONS = ["All", "Work", "Personal", "Study", "Other"];

function toReminderDateTime(reminder) {
  if (reminder.dateTime) return new Date(reminder.dateTime);
  if (reminder.datetime) return new Date(reminder.datetime);
  if (reminder.date)
    return new Date(`${reminder.date}T${reminder.time || "09:00"}`);
  return new Date(0);
}

const Home = () => {
  const { token } = useAuth();

  const { sortedReminders, loading, setReminders } = useReminders();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingReminder, setEditingReminder] = useState(null);

  // 📅 Calendar state
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const getDateKey = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    return d.toISOString().slice(0, 10);
  };

  // ✅ Filter logic
  const filteredReminders = useMemo(() => {
    return sortedReminders.filter((r) => {
      const catMatch =
        selectedCategory === "All" ||
        (r.category || "Other") === selectedCategory;

      const dateKey = getDateKey(toReminderDateTime(r));
      const dateMatch =
        !selectedDate || (selectedDate && dateKey === selectedDate);

      return catMatch && dateMatch;
    });
  }, [sortedReminders, selectedCategory, selectedDate]);

  // ✅ CRUD handlers
  const handleCreateReminder = async (payload) => {
    const newReminder = await api.createReminder(token, payload);
    setReminders((prev) => [...prev, newReminder]);
  };

  const handleDeleteReminder = async (id) => {
    await api.deleteReminder(token, id);
    setReminders((prev) => prev.filter((r) => r._id !== id));
  };

  const handleUpdateReminder = async (id, payload) => {
    const updated = await api.updateReminder(token, id, payload);
    setReminders((prev) =>
      prev.map((r) => (r._id === id ? updated : r))
    );
    setEditingReminder(null);
  };

  return (
    <Layout>
      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
        
        {/* LEFT SIDE */}
        <div className="space-y-4">
          
          <AddReminder
            onCreate={handleCreateReminder}
            onUpdate={handleUpdateReminder}
            editingReminder={editingReminder}
            onCancelEdit={() => setEditingReminder(null)}
          />

          <section className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
            
            {/* Header */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">Reminders</h2>

              {/* Category filter */}
              <div className="flex flex-wrap gap-1 rounded-full bg-slate-100 px-1 py-1 text-xs dark:bg-slate-800">
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-2.5 py-1 transition ${
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected date */}
            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="mb-3 text-xs px-2 py-1 bg-slate-200 rounded"
              >
                Clear date filter ({selectedDate})
              </button>
            )}

            {/* List */}
            {loading ? (
              <p className="text-sm text-slate-500">Loading...</p>
            ) : filteredReminders.length === 0 ? (
              <p className="text-sm text-slate-500">
                No reminders found
              </p>
            ) : (
              <ul className="space-y-3">
                {filteredReminders.map((rem) => {
                  const date = toReminderDateTime(rem);

                  return (
                    <li
                      key={rem._id}
                      className="flex justify-between items-center p-3 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">
                          {rem.title || "(no title)"}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {date.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingReminder(rem)}
                          className="px-2 py-1 text-xs border rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteReminder(rem._id)
                          }
                          className="px-2 py-1 text-xs border text-red-500 rounded"
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

        {/* RIGHT SIDE (Calendar) */}
        <div className="hidden md:block">
          <Calendar
            reminders={sortedReminders}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />
        </div>

      </div>
    </Layout>
  );
};

export default Home;