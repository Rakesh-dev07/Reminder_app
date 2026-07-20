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
  hideHeaderOnMobile = false,

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
        <div
          className={`app-form-header ${
            hideHeaderOnMobile ? "hidden lg:block" : ""
          }`}
        >
          <h2 className="text-2xl font-bold">{title}</h2>

          {description && (
            <p className="app-text-muted mt-2 text-sm">{description}</p>
          )}
        </div>
      )}

      {/* =========================
    Scrollable Body
========================== */}

      <div className="relative flex-1 min-h-0">
        <div
          className="
            py-6
            pr-2

            overflow-visible

            lg:h-full
            lg:overflow-y-auto

            hide-scrollbar
        "
        >
          <div className="space-y-6 pb-8 lg:pb-0">
            <ReminderFields form={form} handleChange={handleChange} />

            <RepeatOptions form={form} setField={setField} errors={errors} />
          </div>
        </div>

        {/* Bottom Fade */}

        <div className="hidden lg:block app-scroll-fade" />
      </div>

      {/* =========================
          Footer
      ========================== */}

      <div className="app-form-footer">
        <div
          className={`
        flex
        flex-col
        gap-3

        sm:flex-row
        sm:items-center
        ${showCancel ? "sm:justify-between" : ""}
    `}
        >
          {" "}
          {showCancel && (
            <button type="button" onClick={onCancel} className="btn-cancel">
              {cancelLabel}
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary-lg flex-1"
          >
            {loading ? "Saving..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
