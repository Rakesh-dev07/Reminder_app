import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import Layout from "../components/Layout";
import { toSafeDate, formatDateTime } from "../utils/date";

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

  return (
    <Layout>
      <div className="flex justify-center px-4 py-8">

        {/* LOADING */}
        {loading && (
          <div className="text-slate-500">
            Loading reminder...
          </div>
        )}

        {/* NOT FOUND */}
        {!loading && !reminder && (
          <div className="w-full max-w-md rounded-2xl bg-white shadow-md border border-slate-200 p-6 text-center dark:bg-slate-900 dark:border-slate-700">
            <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Reminder not found
            </h1>

            <Link
              to="/"
              className="mt-4 inline-block text-indigo-600 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        )}

        {/* MAIN CARD */}
        {!loading && reminder && (
          <div className="w-full max-w-xl rounded-2xl 
            bg-white shadow-md border border-slate-200 
            p-6 
            dark:bg-slate-900 dark:border-slate-700"
          >

            {/* TITLE */}
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {reminder.title}
            </h1>

            {/* DESCRIPTION */}
            <div className="mt-3">
              {reminder.description ? (
                <p className="text-slate-600 dark:text-slate-300">
                  {reminder.description}
                </p>
              ) : (
                <p className="text-slate-400 italic">
                  No description provided
                </p>
              )}
            </div>

            {/* DATE & TIME */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

              <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                <p className="text-slate-500 text-xs">Date</p>
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  {toSafeDate(reminder)
                    ? formatDateTime(toSafeDate(reminder)).split(",")[0]
                    : reminder.date}
                </p>
              </div>

              <div className="rounded-lg bg-slate-100 p-3 dark:bg-slate-800">
                <p className="text-slate-500 text-xs">Time</p>
                <p className="font-medium text-slate-800 dark:text-slate-100">
                  {reminder.time || "N/A"}
                </p>
              </div>

            </div>

            {/* BACK BUTTON */}
            <Link
              to="/"
              className="mt-6 inline-block text-indigo-600 hover:underline font-medium"
            >
              ← Back to Home
            </Link>

          </div>
        )}

      </div>
    </Layout>
  );
}