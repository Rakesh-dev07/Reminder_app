import React from "react";

const CATEGORY_OPTIONS = [
  "Work",
  "Personal",
  "Study",
  "Other",
];

const ReminderFields = ({
  form,
  handleChange,
}) => {
  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="space-y-2">
        <label className="app-label">
          Title
        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Doctor appointment..."
          required
          className="app-input"
        />
      </div>

      {/* Date • Time • Category */}
      <div className="grid gap-4 md:grid-cols-3">

        {/* Date */}
        <div className="space-y-2">
          <label className="app-label">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="app-input"
          />
        </div>

        {/* Time */}
        <div className="space-y-2">
          <label className="app-label">
            Time
          </label>

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="app-input"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="app-label">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="app-select"
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
        <label className="app-label">
          Notes
        </label>

        <textarea
          rows={3}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional notes..."
          className="app-textarea"
        />
      </div>
    </div>
  );
};

export default ReminderFields;
