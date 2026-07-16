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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-2 text-lg font-semibold">✨ AI Quick Add</h2>

      <p className="mb-4 text-sm text-slate-500">
        Describe your reminder naturally.
      </p>

     <textarea
  rows={5}
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  placeholder="Example: Remind me every Monday, Wednesday and Friday at 6 AM to go to the gym."
  className="
    mb-3
    w-full
    resize-none
    rounded-xl

    border
    border-slate-300

    bg-white
    px-4
    py-3

    text-sm
    text-slate-900

    placeholder:text-slate-400

    outline-none
    transition-all
    duration-200

    focus:border-indigo-500
    focus:ring-2
    focus:ring-indigo-500/20

    dark:border-slate-700
    dark:bg-slate-800
    dark:text-white
    dark:placeholder:text-slate-500
  "
/>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {prompt.length} characters
        </span>

        <button
          onClick={generateReminder}
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700 disabled:opacity-50"
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
