import { useEffect, useState } from "react";
import { resetRecurrence } from "../utils/recurrence";

const DEFAULT_CATEGORY = "Other";

const emptyForm = {
  title: "",
  description: "",
  dateTime: "",
  category: DEFAULT_CATEGORY,

  ...resetRecurrence(),
};

function buildDateTimeValue(date, time) {
  if (!date) return "";

  return `${date}T${time || "09:00"}`;
}

export default function useReminderForm(editingReminder) {
  const [form, setForm] = useState(emptyForm);

  const isEditMode = Boolean(editingReminder);

  useEffect(() => {
    if (!editingReminder) {
      setForm(emptyForm);
      return;
    }

    setForm({
      title: editingReminder.title || "",

      description:
        editingReminder.description || "",

      dateTime: buildDateTimeValue(
        editingReminder.date,
        editingReminder.time
      ),

      category:
        editingReminder.category ||
        DEFAULT_CATEGORY,

      repeat:
        editingReminder.repeat || "none",

      repeatInterval:
        editingReminder.repeatInterval || 1,

      repeatDays:
        editingReminder.repeatDays || [],

      endDate:
        editingReminder.endDate || "",

      occurrences:
        editingReminder.occurrences ?? "",
    });
  }, [editingReminder]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function setField(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
  }

  function buildPayload() {
    const [date, timePart] =
      form.dateTime.split("T");

    return {
      title: form.title.trim(),

      description:
        form.description.trim(),

      category: form.category,

      date,

      time:
        timePart?.slice(0, 5) || null,

      repeat: form.repeat,

      repeatInterval:
        Number(form.repeatInterval),

      repeatDays: form.repeatDays,

      endDate:
        form.endDate || null,

      occurrences:
        form.occurrences === ""
          ? null
          : Number(form.occurrences),
    };
  }

  return {
    form,

    setForm,

    setField,

    handleChange,

    buildPayload,

    resetForm,

    isEditMode,
  };
}