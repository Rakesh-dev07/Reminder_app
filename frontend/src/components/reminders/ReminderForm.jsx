import React from "react";

const CATEGORY_OPTIONS = [
  "Work",
  "Personal",
  "Study",
  "Other",
];

const ReminderForm = ({
  form,
  handleChange,
}) => {
  return (
    <div className="space-y-5">

      {/* Title */}

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Title
        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Doctor appointment..."
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {/* Date & Time */}

      <div className="grid gap-4 md:grid-cols-2">

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Date & Time
          </label>

          <input
            type="datetime-local"
            name="dateTime"
            value={form.dateTime}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Category */}

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {CATEGORY_OPTIONS.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Notes */}

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Notes
        </label>

        <textarea
          rows={3}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional notes..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

    </div>
  );
};

export default ReminderForm;