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
          <div className="app-text-muted">
            Loading reminder...
          </div>
        )}

        {/* NOT FOUND */}
        {!loading && !reminder && (
          <div className="app-card w-full max-w-md p-6 text-center">
            <h1 className="text-lg font-semibold">
              Reminder not found
            </h1>

            <Link
              to="/"
              className="app-link mt-4 inline-block"
            >
              ← Back to Home
            </Link>
          </div>
        )}

        {/* MAIN CARD */}
        {!loading && reminder && (
          <div className="app-card w-full max-w-xl p-6">
            <h1 className="text-2xl font-bold">
              {reminder.title}
            </h1>

            {/* DESCRIPTION */}
            <div className="mt-3">
              {reminder.description ? (
                <p className="app-text-muted">
                  {reminder.description}
                </p>
              ) : (
                <p className="app-text-muted italic">
                  No description provided
                </p>
              )}
            </div>

            {/* DATE & TIME */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

              <div className="app-info-box">
                <p className="app-text-muted text-xs">Date</p>
                <p className="font-medium">
                  {toSafeDate(reminder)
                    ? formatDateTime(toSafeDate(reminder)).split(",")[0]
                    : reminder.date}
                </p>
              </div>

              <div className="app-info-box">
                <p className="app-text-muted text-xs">Time</p>
                <p className="font-medium">
                  {reminder.time || "N/A"}
                </p>
              </div>

            </div>

            {/* BACK BUTTON */}
            <Link
              to="/"
              className="app-link mt-6 inline-block font-medium"
            >
              ← Back to Home
            </Link>

          </div>
        )}

      </div>
    </Layout>
  );
}