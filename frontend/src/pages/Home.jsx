import React, { useMemo, useState } from "react";

import Layout from "../components/Layout";
import AddReminder from "../components/reminders/AddReminder";
import ReminderList from "../components/reminders/ReminderList";
import Calendar from "../components/Calendar";
import AIQuickAdd from "../components/AIQuickAdd/AIQuickAdd";
import ReviewReminderModal from "../components/reminders/ReviewReminderModal";

import { useReminders } from "../hooks/useReminders";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

import { toSafeDate, getDateKey } from "../utils/date";

const Home = () => {
  const { token } = useAuth();

  const { sortedReminders, loading, setReminders } = useReminders();

  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewReminder, setReviewReminder] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);

  const [editingReminder, setEditingReminder] = useState(null);

  const [showMobileFilters, setShowMobileFilters] =
    useState(false);

  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const filteredReminders = useMemo(() => {
    return sortedReminders.filter((r) => {
      const categoryMatch =
        selectedCategory === "All" ||
        (r.category || "Other") === selectedCategory;

      const dateKey = getDateKey(toSafeDate(r));

      const dateMatch =
        !selectedDate || dateKey === selectedDate;

      return categoryMatch && dateMatch;
    });
  }, [
    sortedReminders,
    selectedCategory,
    selectedDate,
  ]);

  const handleCreateReminder = async (payload) => {
    const newReminder = await api.createReminder(
      token,
      payload
    );

    setReminders((prev) => [...prev, newReminder]);
  };

  const handleDeleteReminder = async (id) => {
    await api.deleteReminder(token, id);

    setReminders((prev) =>
      prev.filter((r) => r._id !== id)
    );
  };

  const handleUpdateReminder = async (id, payload) => {
    const updated = await api.updateReminder(
      token,
      id,
      payload
    );

    setReminders((prev) =>
      prev.map((r) =>
        r._id === id ? updated : r
      )
    );

    setEditingReminder(null);
  };

  const handleReviewReminder = (reminder) => {
    setReviewReminder(reminder);
    setReviewOpen(true);
  };

  const handleCreateFromAI = async (payload) => {
    const newReminder = await api.createReminder(
      token,
      payload
    );

    setReminders((prev) => [...prev, newReminder]);

    setReviewOpen(false);
    setReviewReminder(null);
  };

  const calendarProps = {
    reminders: sortedReminders,
    selectedDate,
    setSelectedDate,
    month,
    setMonth,
    year,
    setYear,
  };

  return (
    <Layout>

      {/* ================= MOBILE / TABLET ================= */}

      <div className="space-y-6 lg:hidden">

        <AIQuickAdd
          onReview={handleReviewReminder}
        />

        <AddReminder
          collapsible
          onCreate={handleCreateReminder}
          onUpdate={handleUpdateReminder}
          editingReminder={editingReminder}
          onCancelEdit={() =>
            setEditingReminder(null)
          }
        />

        <Calendar {...calendarProps} />

        <ReminderList
          reminders={filteredReminders}
          loading={loading}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={
            setShowMobileFilters
          }
          onEdit={setEditingReminder}
          onDelete={handleDeleteReminder}
        />

      </div>

      {/* ================= DESKTOP ================= */}

      <div className="hidden lg:flex lg:items-start lg:gap-6">

        {/* LEFT COLUMN */}

        <div className="flex min-w-0 flex-1 flex-col gap-6">

          <AddReminder
            onCreate={handleCreateReminder}
            onUpdate={handleUpdateReminder}
            editingReminder={editingReminder}
            onCancelEdit={() =>
              setEditingReminder(null)
            }
          />

          <ReminderList
            reminders={filteredReminders}
            loading={loading}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            showMobileFilters={
              showMobileFilters
            }
            setShowMobileFilters={
              setShowMobileFilters
            }
            onEdit={setEditingReminder}
            onDelete={handleDeleteReminder}
          />

        </div>

        {/* RIGHT COLUMN */}

        <aside className="w-[330px] xl:w-[360px] flex-shrink-0">

          <div className="space-y-6">

            <AIQuickAdd
              onReview={handleReviewReminder}
            />

            <Calendar {...calendarProps} />

          </div>

        </aside>

      </div>

      <ReviewReminderModal
        open={reviewOpen}
        reminder={reviewReminder}
        onClose={() =>
          setReviewOpen(false)
        }
        onSubmit={handleCreateFromAI}
      />

    </Layout>
  );
};

export default Home;