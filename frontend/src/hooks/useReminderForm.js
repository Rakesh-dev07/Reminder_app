import { useEffect, useState } from "react";
import { resetRecurrence } from "../utils/recurrence";

const DEFAULT_CATEGORY = "Other";

const emptyForm = {
  title: "",
  description: "",

  date: "",
  time: "",

  category: DEFAULT_CATEGORY,

  ...resetRecurrence(),
};

function createFormState(reminder = {}) {
  return {
    title: reminder.title || "",

    description: reminder.description || "",

    date: reminder.date || "",

    time: reminder.time || "",

    category: reminder.category || DEFAULT_CATEGORY,

    repeat: reminder.repeat || "none",

    repeatInterval: reminder.repeatInterval ?? 1,

    repeatDays: reminder.repeatDays || [],

    endDate: reminder.endDate || "",

    occurrences: reminder.occurrences ?? "",
  };
}

export default function useReminderForm(initialReminder = null) {
  const [form, setForm] = useState(emptyForm);

  const isEditMode = Boolean(initialReminder?._id);

  useEffect(() => {
    if (!initialReminder) {
      setForm(emptyForm);
      return;
    }

    setForm(createFormState(initialReminder));
  }, [initialReminder]);

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

  function getReminderPayload() {
    return {
      title: form.title.trim(),

      description: form.description.trim(),

      date: form.date,

      time: form.time || null,

      category: form.category,

      repeat: form.repeat,

      repeatInterval: Number(form.repeatInterval),

      repeatDays: form.repeatDays,

      endDate: form.endDate || null,

      occurrences:
        form.occurrences === ""
          ? null
          : Number(form.occurrences),
    };
  }

  return {
    form,

    setForm,

    handleChange,

    setField,

    resetForm,

    getReminderPayload,

    isEditMode,
  };
}