import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

function toReminderDateTime(reminder) {
  if (reminder.dateTime) return new Date(reminder.dateTime);
  if (reminder.datetime) return new Date(reminder.datetime);
  if (reminder.date)
    return new Date(`${reminder.date}T${reminder.time || "09:00"}`);
  return new Date(0);
}

export const useReminders = () => {
  const { token } = useAuth();

  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getReminders(token);
        setReminders(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  const sortedReminders = useMemo(() => {
    return reminders
      .slice()
      .sort((a, b) => toReminderDateTime(a) - toReminderDateTime(b));
  }, [reminders]);

  const upcomingReminders = useMemo(() => {
    const now = new Date();
    return sortedReminders.filter(
      (r) => toReminderDateTime(r) > now
    );
  }, [sortedReminders]);

  return {
    reminders,
    sortedReminders,
    upcomingReminders,
    loading,
    setReminders, // for create/update/delete reuse
  };
};
