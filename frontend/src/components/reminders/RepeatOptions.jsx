import React, { useEffect, useState } from "react";
import {
  REPEAT_OPTIONS,
  getRepeatLabel,
} from "../../utils/recurrence";
import WeeklySelector from "./WeeklySelector";
import RepeatEndOptions from "./RepeatEndOptions";

const RepeatOptions = ({
  form,
  setField,
  errors = {},
}) => {
  const [endType, setEndType] = useState("never");

  // Determine end type from form values
  useEffect(() => {
    if (form.endDate) {
      setEndType("date");
    } else if (form.occurrences) {
      setEndType("occurrences");
    } else {
      setEndType("never");
    }
  }, [form.endDate, form.occurrences]);

  const handleEndTypeChange = (type) => {
    setEndType(type);

    if (type === "never") {
      setField("endDate", "");
      setField("occurrences", "");
    }

    if (type === "date") {
      setField("occurrences", "");
    }

    if (type === "occurrences") {
      setField("endDate", "");
    }
  };

  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">

      <div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Recurring Reminder
        </h3>

        <p className="text-sm text-slate-500">
          Automatically repeat this reminder.
        </p>
      </div>

      {/* Repeat Type */}

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Repeat
        </label>

        <select
          value={form.repeat}
          onChange={(e) =>
            setField("repeat", e.target.value)
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
        >
          {REPEAT_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Interval */}

      {form.repeat !== "none" && (
        <div className="space-y-2">

          <label className="text-sm font-medium">
            Repeat Every
          </label>

          <div className="flex items-center gap-3">

            <input
              type="number"
              min={1}
              value={form.repeatInterval}
              onChange={(e) =>
                setField(
                  "repeatInterval",
                  e.target.value
                )
              }
              className="w-24 rounded-xl border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
            />

            <span className="text-sm text-slate-600 dark:text-slate-300">
              {getRepeatLabel(form.repeat).toLowerCase()}
              {Number(form.repeatInterval) > 1
                ? "s"
                : ""}
            </span>

          </div>

          {errors.repeatInterval && (
            <p className="text-sm text-red-500">
              {errors.repeatInterval}
            </p>
          )}

        </div>
      )}

      {/* Weekly */}

      {form.repeat === "weekly" && (
        <WeeklySelector
          selectedDays={form.repeatDays}
          onChange={(days) =>
            setField("repeatDays", days)
          }
          error={errors.repeatDays}
        />
      )}

      {/* End Options */}

      {form.repeat !== "none" && (
        <RepeatEndOptions
          endType={endType}
          endDate={form.endDate}
          occurrences={form.occurrences}
          onEndTypeChange={handleEndTypeChange}
          onEndDateChange={(value) =>
            setField("endDate", value)
          }
          onOccurrencesChange={(value) =>
            setField("occurrences", value)
          }
          error={errors}
        />
      )}
    </div>
  );
};

export default RepeatOptions;