import useAIReminder from "../../hooks/useAIReminder";
import AIPreviewCard from "./AIPreviewCard";

export default function AIQuickAdd({ onReview }) {
  const {
    prompt,
    setPrompt,

    loading,

    error,

    reminder,

    aiInfo,

    generateReminder,
  } = useAIReminder();

  return (
    <div className="app-card p-5 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold">✨ AI Quick Add</h2>

      <p className="app-text-muted mb-4 text-sm">
        Describe your reminder naturally.
      </p>

     <textarea
  rows={5}
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  placeholder="Example: Remind me every Monday, Wednesday and Friday at 6 AM to go to the gym."
  className="app-textarea mb-3 px-4 py-3 outline-none"
/>

      <div className="mb-4 flex items-center justify-between">
        <span className="app-text-muted text-xs">
          {prompt.length} characters
        </span>

        <button
          onClick={generateReminder}
          disabled={loading}
          className="btn-primary rounded-xl px-4 py-2 disabled:opacity-50"
        >
          {loading ? "Generating..." : "✨ Generate Reminder"}
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

      {reminder && (
        <AIPreviewCard
          reminder={reminder}
          aiInfo={aiInfo}
          onReview={() => onReview(reminder)}
        />
      )}
    </div>
  );
}
