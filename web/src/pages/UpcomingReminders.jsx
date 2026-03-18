import Layout from "../components/Layout";
import { useReminders } from "../hooks/useReminders";
import ReminderCard from "../components/ReminderCard";

const UpcomingReminders = () => {
  const { upcomingReminders, loading } = useReminders();

  return (
    <Layout>
      <h2 className="text-lg font-semibold mb-4">
        Upcoming Reminders
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : upcomingReminders.length === 0 ? (
        <p>No upcoming reminders</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {sortedReminders.map((r) => (
    <ReminderCard
      key={r._id}
      reminder={r}
    />
  ))}
</div>
      )}
    </Layout>
  );
};

export default UpcomingReminders;