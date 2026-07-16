import ReminderFields from "./ReminderFields";
import RepeatOptions from "./RepeatOptions";

export default function ReminderForm({
  title,
  description,

  form,
  handleChange,
  setField,

  loading,
  errors = {},

  onSubmit,

  submitLabel = "Add Reminder",

  showHeader = false,

  showCancel = false,
  cancelLabel = "Cancel",
  onCancel,

  className = "",
}) {
  return (
    <form onSubmit={onSubmit} className={`flex h-full flex-col ${className}`}>
      {/* =========================
          Header
      ========================== */}

      {showHeader && (
        <div className="flex-shrink-0 border-b border-slate-200 pb-5 dark:border-slate-700">
          <h2 className="text-2xl font-bold">{title}</h2>

          {description && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
      )}

      {/* =========================
    Scrollable Body
========================== */}

      <div className="relative flex-1 overflow-hidden">
        <div
          className="
      h-full
      overflow-y-auto
      hide-scrollbar

      py-6
      pr-2
    "
        >
          <div className="space-y-6">
            <ReminderFields form={form} handleChange={handleChange} />

            <RepeatOptions form={form} setField={setField} errors={errors} />
          </div>
        </div>

        {/* Bottom Fade */}

        <div
          className="
      pointer-events-none

      absolute
      bottom-0
      left-0
      right-0

      h-10

      bg-gradient-to-t
      dark:from-slate-900
      from-white
      dark:via-slate-900/70
      via-white/80
      to-transparent
    "
        />
      </div>

      {/* =========================
          Footer
      ========================== */}

      <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md shadow-[0_-8px_20px_rgba(0,0,0,0.25)] px-6 py-4">
        <div
          className={`flex items-center gap-3 ${showCancel ? "justify-between" : ""}`}
        >
          {" "}
          {showCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="
    rounded-xl
    border
    border-slate-600
    px-6
    py-3
    font-medium
    transition-all
    hover:bg-slate-800
  "
            >
              {cancelLabel}
            </button>
          )}
          <button
  type="submit"
  disabled={loading}
  className="
    flex-1

    rounded-xl

    bg-indigo-600

    py-3

    font-semibold
    text-white

    transition-all
    duration-200

    hover:bg-indigo-700
    hover:shadow-lg
    hover:shadow-indigo-500/30

    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  {loading ? "Saving..." : submitLabel}
</button>
        </div>
      </div>
    </form>
  );
}
