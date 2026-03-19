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

  /* Loading state */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading reminder...
      </div>
    );
  }

  /* Not found */
  if (!reminder) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Reminder not found
          </h1>
          <Link
            to="/"
            className="mt-4 inline-block text-sky-600 hover:text-sky-700 font-medium"
          >
            ← Go back to Home Page
          </Link>
        </div>
      </div>
    );
  }

  /* Main view */
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          {reminder.title}
        </h1>

        {/* Description */}
        <div className="mt-3">
          {reminder.description ? (
            <p className="text-gray-700 leading-relaxed">
              {reminder.description}
            </p>
          ) : (
            <p className="text-gray-400 italic">No description provided</p>
          )}
        </div>

        {/* Date & Time */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-100 rounded-md p-3">
            <p className="text-gray-500">Date</p>
            <p className="font-medium text-gray-800">{reminder.date}</p>
          </div>

          <div className="bg-gray-100 rounded-md p-3">
            <p className="text-gray-500">Time</p>
            <p className="font-medium text-gray-800">
              {reminder.time || "N/A"}
            </p>
          </div>
        </div>

        {/* Back button */}
        <Link
          to="/"
          className="mt-6 inline-block text-sky-600 hover:text-sky-700 font-medium"
        >
          ← Back to Home page
        </Link>
      </div>
    </div>
  );
}