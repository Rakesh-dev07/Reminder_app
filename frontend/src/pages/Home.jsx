import React, { useMemo, useState } from "react";
import Layout from "../components/Layout";
import AddReminder from "../components/AddReminder";
import Calendar from "../components/Calendar";
import { useReminders } from "../hooks/useReminders";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toSafeDate, getDateKey, formatDateTime } from "../Utils/date";

const CATEGORY_OPTIONS = ["All", "Work", "Personal", "Study", "Other"];

const Home = () => {
  const { token } = useAuth();
  const { sortedReminders, loading, setReminders } = useReminders();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingReminder, setEditingReminder] = useState(null);

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const filteredReminders = useMemo(() => {
    return sortedReminders.filter((r) => {
      const catMatch =
        selectedCategory === "All" ||
        (r.category || "Other") === selectedCategory;

      const dateKey = getDateKey(toSafeDate(r));
      const dateMatch = !selectedDate || dateKey === selectedDate;

      return catMatch && dateMatch;
    });
  }, [sortedReminders, selectedCategory, selectedDate]);

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
    setReminders((prev) => prev.map((r) => (r._id === id ? updated : r)));
    setEditingReminder(null);
  };

  return (
    <Layout>
      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
        {/* LEFT */}
        <div className="space-y-4">
          <AddReminder
            onCreate={handleCreateReminder}
            onUpdate={handleUpdateReminder}
            editingReminder={editingReminder}
            onCancelEdit={() => setEditingReminder(null)}
          />

          <section className="rounded-2xl border bg-white/80 p-4 shadow-sm dark:bg-slate-900/80">
            <div className="mb-3 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Reminders</h2>

              <div className="flex gap-1 text-xs">
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2 py-1 rounded ${
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="mb-2 text-xs"
              >
                Clear ({selectedDate})
              </button>
            )}

            {loading ? (
              <p>Loading...</p>
            ) : filteredReminders.length === 0 ? (
              <p>No reminders</p>
            ) : (
              <ul className="space-y-3">
                {filteredReminders.map((rem) => {
                  const date = toSafeDate(rem);

                  return (
                    <li
                      key={rem._id}
                      className="flex justify-between items-center p-3 border rounded-lg hover:shadow-sm transition"
                    >
                      <div>
                        <h3>{rem.title}</h3>
                        <p className="text-xs text-slate-500">
                          {formatDateTime(date)}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingReminder(rem)}
                          className="px-3 py-1 text-xs font-medium rounded-md border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteReminder(rem._id)}
                          className="px-3 py-1 text-xs font-medium rounded-md bg-red-500 text-white hover:bg-red-600 transition"
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

        {/* RIGHT */}
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
