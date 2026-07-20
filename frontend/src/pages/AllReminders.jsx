import Layout from "../components/Layout";
import { useReminders } from "../hooks/useReminders";
import ReminderCard from "../components/ReminderCard";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

const AllReminders = () => {
  const { token } = useAuth();
  const { sortedReminders, loading, setReminders } = useReminders();

  // ✅ Delete handler
  const handleDelete = async (id) => {
    try {
      await api.deleteReminder(token, id);
      setReminders((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <Layout>
      <div className="space-y-4">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            All Reminders
          </h2>

          <span className="app-text-muted text-xs">
            {sortedReminders.length} total
          </span>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="app-text-muted text-sm">Loading...</p>
        ) : sortedReminders.length === 0 ? (
          <div className="app-empty-state">
            <p className="app-text-muted text-sm">
              No reminders found
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedReminders.map((rem) => (
              <ReminderCard
                key={rem._id}
                reminder={rem}
                onDelete={handleDelete}   // ✅ important
              />
            ))}
          </div>
        )}

      </div>
    </Layout>
  );
};

export default AllReminders;