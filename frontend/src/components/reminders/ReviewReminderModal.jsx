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
      className="app-modal-overlay"
      onClick={onClose}
    >
      <div
    onClick={(e)=>e.stopPropagation()}
    className="
        flex
        min-h-screen
        items-start
        justify-center
        p-2
        sm:p-4
        lg:min-h-full
        lg:items-center
    "
>
        <div className="app-modal">
        <ReminderForm
          className="
        flex-1
        min-h-0
        px-4
        py-4
        sm:px-6
        sm:py-6
    "

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
    </div>
  );
}