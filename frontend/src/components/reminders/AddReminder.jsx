import React, { useState } from "react";
import ReminderForm from "./ReminderForm";
import RepeatOptions from "./RepeatOptions";
import useReminderForm from "../../hooks/useReminderForm";
import { validateRecurrence } from "../../utils/recurrence";

const AddReminder = ({
  onCreate,
  onUpdate,
  editingReminder,
  onCancelEdit,
}) => {
  const {
    form,
    handleChange,
    setField,
    buildPayload,
    resetForm,
    isEditMode,
  } = useReminderForm(editingReminder);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRecurrence(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);

      const payload = buildPayload();

      if (isEditMode) {
        await onUpdate(editingReminder._id, payload);
      } else {
        await onCreate(payload);
        resetForm();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow dark:border-slate-700 dark:bg-slate-900">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {isEditMode ? "Edit Reminder" : "Add Reminder"}
        </h2>

        {isEditMode && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm text-indigo-600 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <ReminderForm
          form={form}
          handleChange={handleChange}
        />

        <RepeatOptions
          form={form}
          setField={setField}
          errors={errors}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading
            ? isEditMode
              ? "Saving..."
              : "Creating..."
            : isEditMode
              ? "Save Changes"
              : "Add Reminder"}
        </button>
      </form>
    </div>
  );
};

export default AddReminder;