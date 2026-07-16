import { useEffect, useState } from "react";

import ReminderForm from "./ReminderForm";
import useReminderForm from "../../hooks/useReminderForm";
import { validateRecurrence } from "../../utils/recurrence";

export default function ReviewReminderModal({
  open,
  reminder,
  onClose,
  onSubmit,
}) {
  const {
    form,
    handleChange,
    setField,
    getReminderPayload,
  } = useReminderForm(reminder);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /* Prevent background scrolling */
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  async function handleFormSubmit(e) {
    e.preventDefault();

    const validationErrors = validateRecurrence(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      setLoading(true);

      await onSubmit(getReminderPayload());

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          flex
          h-[90vh]
          w-full
          max-w-3xl
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl

          dark:bg-slate-900

          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >
        <ReminderForm
          className="h-full px-6 py-6"

          title="Review Reminder"

          description="Review and edit the reminder before saving."

          showHeader

          showCancel

          cancelLabel="Cancel"

          onCancel={onClose}

          form={form}

          handleChange={handleChange}

          setField={setField}

          errors={errors}

          loading={loading}

          onSubmit={handleFormSubmit}

          submitLabel="Add Reminder"
        />
      </div>
    </div>
  );
}