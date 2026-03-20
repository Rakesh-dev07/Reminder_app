import React, { useEffect, useState } from "react";

const CATEGORY_OPTIONS = ["Work", "Personal", "Study", "Other"];

const emptyForm = {
  title: "",
  description: "",
  dateTime: "",
  category: "Other",
};

function buildDateTimeValue(date, time) {
  if (!date) return "";
  return `${date}T${time || "09:00"}`;
}


const AddReminder = ({ onCreate, onUpdate, editingReminder, onCancelEdit }) => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const isEditMode = Boolean(editingReminder);

  // Pre-fill when editing
  useEffect(() => {
    if (editingReminder) {
      setForm({
        title: editingReminder.title || "",
        description: editingReminder.description || "",
        dateTime: buildDateTimeValue(editingReminder.date, editingReminder.time),
        category: editingReminder.category || "Other",
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingReminder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.dateTime) return;

    try {
      setLoading(true);

      const [date, timePart] = form.dateTime.split("T");
      const payload = {
        title: form.title,
        description: form.description,
        category: form.category,
        date,
        time: timePart?.slice(0, 5) || null,
      };


      if (isEditMode) {
        await onUpdate(editingReminder._id, payload);
      } else {
        await onCreate(payload);
      }

      if (!isEditMode) {
        setForm(emptyForm);
      }
    } catch (err) {
      console.error("Error saving reminder", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white shadow-md border border-slate-200 p-4 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {isEditMode ? "Edit Reminder" : "Add Reminder"}
        </h2>
        {isEditMode && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline dark:text-slate-300 dark:hover:text-white"
          >
            Cancel edit
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-3 md:grid-cols-2 md:items-end"
      >
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Doctor appointment, project deadline..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Date & Time
          </label>
          <input
            type="datetime-local"
            name="dateTime"
            value={form.dateTime}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-400"
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Notes
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={2}
            placeholder="Optional notes, location, link, etc."
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-indigo-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          {loading
            ? isEditMode
              ? "Saving..."
              : "Adding..."
            : isEditMode
              ? "Save changes"
              : "Add reminder"}
        </button>
      </form>
    </div>
  );
};

export default AddReminder;
