import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export default function ReminderDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [reminder, setReminder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReminder() {
       if (!token || !id) {
        setLoading(false);
        return;
      }

      try {
       const data = await api.getReminderById(token, id);
        setReminder(data);
      } catch (err) {
        console.error("Failed to fetch reminder", err);
        setReminder(null);
      } finally {
        setLoading(false);
      }
    }

    fetchReminder();
  }, [id, token]);

  if (loading) return <div className="p-6">Loading reminder...</div>;

  if (!reminder) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Reminder not found</h1>
        <Link className="mt-3 inline-block text-sky-600 underline" to="/">
          Go back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{reminder.title}</h1>
      {reminder.description ? (
        <p className="mt-2 text-gray-600">{reminder.description}</p>
      ) : (
        <p className="mt-2 text-gray-500">No description</p>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>Date: {reminder.date}</p>
        <p>Time: {reminder.time || "N/A"}</p>
      </div>

      <Link className="mt-4 inline-block text-sky-600 underline" to="/">
        Back to dashboard
      </Link>
    </div>
  );
}
