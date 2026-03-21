import React, { useMemo, useState } from "react";
import Layout from "../components/Layout";
import AddReminder from "../components/AddReminder";
import Calendar from "../components/Calendar";
import { useReminders } from "../hooks/useReminders";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toSafeDate, getDateKey, formatDateTime } from "../utils/date";
import { getCategoryStyle } from "../utils/ui";

const CATEGORY_OPTIONS = ["All", "Work", "Personal", "Study", "Other"];

const Home = () => {
  const { token } = useAuth();
  const { sortedReminders, loading, setReminders } = useReminders();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingReminder, setEditingReminder] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
        {/* LEFT SIDE */}
        <div className="space-y-4 w-full">
          <AddReminder
            onCreate={handleCreateReminder}
            onUpdate={handleUpdateReminder}
            editingReminder={editingReminder}
            onCancelEdit={() => setEditingReminder(null)}
          />

          <section className="w-full rounded-2xl border p-4">
            {/* HEADER + FILTER */}
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">Reminders</h2>

              <div className="flex items-center gap-2 text-xs">
                {/* DESKTOP FILTER */}
                <div className="hidden sm:flex gap-1 bg-slate-100 px-1 py-1 rounded-full dark:bg-slate-800">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2 py-1 rounded-full ${
                        selectedCategory === cat
                          ? "bg-indigo-600 text-white"
                          : "hover:bg-white dark:hover:bg-slate-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* MOBILE FILTER */}
                <div className="relative sm:hidden">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`px-3 py-1 rounded-full ${
                      selectedCategory === "All"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  >
                    All
                  </button>

                  <button
                    onClick={() => setShowMobileFilters((v) => !v)}
                    className="ml-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700"
                  >
                    Others ▼
                  </button>

                  {showMobileFilters && (
                    <div className="absolute right-0 mt-2 w-36 rounded-lg border bg-white shadow-lg dark:bg-slate-900 z-50">
                      {CATEGORY_OPTIONS.filter((c) => c !== "All").map(
                        (cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              setSelectedCategory(cat);
                              setShowMobileFilters(false);
                            }}
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            {cat}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* DATE FILTER */}
            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="mb-2 text-xs text-indigo-600"
              >
                Clear date ({selectedDate})
              </button>
            )}

            {/* LIST */}
            {loading ? (
              <p>Loading...</p>
            ) : filteredReminders.length === 0 ? (
              <p>No reminders found</p>
            ) : (
              <ul className="space-y-3 w-full">
  {filteredReminders.map((rem) => {
    const date = toSafeDate(rem);

    return (
      <li
        key={rem._id}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border rounded-xl 
        bg-white/50 dark:bg-slate-900/50 backdrop-blur"
      >
        {/* LEFT */}
        <div className="w-full space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium break-words">
              {rem.title}
            </h3>

            <span
              className={`px-2.5 py-1 text-[10px] rounded-full font-semibold tracking-wide 
              ${getCategoryStyle(rem.category)}`}
            >
              {rem.category || "Other"}
            </span>
          </div>

          {rem.description && (
            <p className="text-xs text-slate-500 break-words">
              {rem.description}
            </p>
          )}

          <p className="text-xs text-slate-500">
            {formatDateTime(date)}
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex gap-2 self-start sm:self-auto">
          <button
            onClick={() => setEditingReminder(rem)}
            className="text-xs px-3 py-1.5 rounded-md 
            bg-indigo-600 text-white 
            hover:bg-indigo-700 hover:scale-105 active:scale-95 
            transition-all"
          >
            Edit
          </button>

          <button
            onClick={() => handleDeleteReminder(rem._id)}
            className="text-xs px-3 py-1.5 rounded-md 
            bg-red-500 text-white 
            hover:bg-red-600 hover:scale-105 active:scale-95 
            transition-all"
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

        {/* RIGHT SIDE */}
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
