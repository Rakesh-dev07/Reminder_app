import React, { useState } from "react";
import ReminderForm from "./ReminderForm";
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
    getReminderPayload,
    resetForm,
    isEditMode,
  } = useReminderForm(editingReminder);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateRecurrence(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);

      const payload = getReminderPayload();

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
  }

  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow

        dark:border-slate-700
        dark:bg-slate-900

        lg:h-[min(calc(100vh-180px),760px)]
      "
    >
      <ReminderForm
        className="h-full px-6 py-6"

        title={
          isEditMode
            ? "Edit Reminder"
            : "Add Reminder"
        }

        description={
          isEditMode
            ? "Update your reminder."
            : "Create a reminder manually."
        }

        showHeader

        showCancel={isEditMode}

        cancelLabel="Cancel"

        onCancel={onCancelEdit}

        form={form}

        handleChange={handleChange}

        setField={setField}

        errors={errors}

        loading={loading}

        onSubmit={handleSubmit}

        submitLabel={
          isEditMode
            ? "Save Changes"
            : "Add Reminder"
        }
      />
    </section>
  );
};

export default AddReminder;