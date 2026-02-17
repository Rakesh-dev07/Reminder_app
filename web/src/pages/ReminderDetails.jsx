import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ReminderDetails() {
  const { id } = useParams(); 
  const [reminder, setReminder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReminder() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/reminders/${id}`,
          { withCredentials: true }
        );
        setReminder(res.data);
      } catch (err) {
        console.error("Failed to fetch reminder", err);
      } finally {
        setLoading(false);
      }
    }

    fetchReminder();
  }, [id]);

  if (loading) return <div>Loading reminder...</div>;
  if (!reminder) return <div>Reminder not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{reminder.title}</h1>
      <p className="mt-2 text-gray-600">{reminder.description}</p>
    </div>
  );
}
