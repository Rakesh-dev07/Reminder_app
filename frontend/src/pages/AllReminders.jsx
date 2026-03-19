import Layout from "../components/Layout";
import { useReminders } from "../hooks/useReminders";
import ReminderCard from "../components/ReminderCard";

const AllReminders = () => {
  const { sortedReminders, loading } = useReminders();

  return (
    <Layout>
      <h2 className="text-lg font-semibold mb-4">
        All Reminders
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : sortedReminders.length === 0 ? (
        <p>No reminders found</p>
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

export default AllReminders;