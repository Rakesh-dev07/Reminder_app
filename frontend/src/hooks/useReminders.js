import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toSafeDate, isFutureDate } from "../utils/date";

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
    return reminders.slice().sort((a, b) => {
      const d1 = toSafeDate(a);
      const d2 = toSafeDate(b);
      return (d1?.getTime() || 0) - (d2?.getTime() || 0);
    });
  }, [reminders]);

  const upcomingReminders = useMemo(() => {
    return sortedReminders.filter((r) =>
      isFutureDate(toSafeDate(r))
    );
  }, [sortedReminders]);

  return {
    reminders,
    sortedReminders,
    upcomingReminders,
    loading,
    setReminders,
  };
};
