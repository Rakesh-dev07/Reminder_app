import React, { useEffect, useState } from "react";
import ReminderForm from "./ReminderForm";
import useReminderForm from "../../hooks/useReminderForm";
import { validateRecurrence } from "../../utils/recurrence";

const AddReminder = ({
  onCreate,
  onUpdate,
  editingReminder,
  onCancelEdit,
  collapsible = false,
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
  const [isOpen, setIsOpen] = useState(false);

  const title = isEditMode ? "Edit Reminder" : "Add Reminder";
  const description = isEditMode
    ? "Update your reminder."
    : "Create a reminder manually.";

  useEffect(() => {
    if (isEditMode) {
      setIsOpen(true);
    }
  }, [isEditMode]);

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
        if (collapsible) {
          setIsOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className={`
    app-card
    flex
    flex-col
    overflow-hidden
    ${collapsible ? "" : ""}
    lg:h-[min(calc(100vh-180px),760px)]
  `}
    >
      {collapsible && (
        <button
  type="button"
  onClick={() => setIsOpen((v) => !v)}
  className="app-collapsible-trigger text-left"
  aria-expanded={isOpen}
>
  <div className="flex items-center justify-between">
    <div>
      <h3 className="flex items-center gap-2 text-lg font-semibold app-heading">
        <span>📝</span>
        <span>{title}</span>
      </h3>

      {!isOpen && (
        <p className="mt-1 text-sm app-text-muted">
          Create a reminder manually.
        </p>
      )}
    </div>

    <span
      className={`text-lg transition-transform duration-300 ${
        isOpen ? "rotate-180" : ""
      }`}
    >
      ▼
    </span>
  </div>
</button>
      )}

      <div
        className={
          collapsible && !isOpen
            ? "app-collapsible-body-closed"
            : "app-collapsible-body flex-1 min-h-0"
        }
      >
        <ReminderForm
          className="flex-1 min-h-0 px-6 py-6"
          title={title}
          description={description}
          showHeader
          hideHeaderOnMobile={collapsible}
          showCancel={isEditMode}
          cancelLabel="Cancel"
          onCancel={onCancelEdit}
          form={form}
          handleChange={handleChange}
          setField={setField}
          errors={errors}
          loading={loading}
          onSubmit={handleSubmit}
          submitLabel={isEditMode ? "Save Changes" : "Add Reminder"}
        />
      </div>
    </section>
  );
};

export default AddReminder;
