import Layout from "../components/Layout";
import { useReminders } from "../hooks/useReminders";
import ReminderCard from "../components/ReminderCard";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

const UpcomingReminders = () => {
  const { token } = useAuth();
  const { upcomingReminders, loading, setReminders } = useReminders();

  // ✅ Delete handler (IMPORTANT)
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
            Upcoming Reminders
          </h2>

          <span className="text-xs text-slate-500">
            {upcomingReminders.length} total
          </span>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : upcomingReminders.length === 0 ? (
          <div className="text-center py-10 border rounded-xl 
          bg-white/50 dark:bg-slate-900/50">
            <p className="text-sm text-slate-500">
              No upcoming reminders
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingReminders.map((rem) => (
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

export default UpcomingReminders;